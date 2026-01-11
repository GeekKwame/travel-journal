import { type ActionFunctionArgs, data } from "react-router";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson, parseTripData } from "@/lib/utils";
import { supabase } from "~/lib/supabase";
import { createProduct } from "~/lib/stripe";
import type { Trip } from "~/index";

export const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const body = await request.json();
        const {
            country,
            numberOfDays,
            travelStyle,
            interests,
            budget,
            groupType,
            userId,
        } = body;

        // Input validation
        if (!country || typeof country !== 'string') {
            return data({ error: "Country is required and must be a string" }, { status: 400 });
        }
        if (!numberOfDays || numberOfDays < 1 || numberOfDays > 30) {
            return data({ error: "Number of days must be between 1 and 30" }, { status: 400 });
        }
        if (!travelStyle || !interests || !budget || !groupType) {
            return data({ error: "All trip preferences are required" }, { status: 400 });
        }
        if (!userId) {
            return data({ error: "User ID is required" }, { status: 401 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

        const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user info:
        Budget: '${budget}'
        Interests: '${interests}'
        TravelStyle: '${travelStyle}'
        GroupType: '${groupType}'
        
        CRITICAL: Return ONLY a clean JSON object wrapped in \`\`\`json \`\`\` markdown blocks.
        The JSON must follow this exact structure:
        {
          "name": "Catchy Trip Title",
          "description": "Short summary (max 100 words)",
          "estimatedPrice": "$PriceRange",
          "duration": ${numberOfDays},
          "budget": "${budget}",
          "travelStyle": "${travelStyle}",
          "country": "${country}",
          "interests": "${interests}",
          "groupType": "${groupType}",
          "bestTimeToVisit": ["Season/Month range: Reason"],
          "weatherInfo": ["Season: Temp range"],
          "location": {
            "city": "Primary City",
            "coordinates": [lat, lon],
            "openStreetMap": "OSM link"
          },
          "itinerary": [
            {
              "day": 1,
              "location": "City Name",
              "activities": [
                {"time": "Morning", "description": "Short description with emoji"}
              ]
            }
          ]
        }`;

        // Try primary model, fallback to alternatives
        const models = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-pro'];
        let textResult;
        let lastError;

        for (const modelName of models) {
            try {
                console.log(`Attempting to use model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                textResult = await model.generateContent([prompt]);
                console.log(`Successfully generated content with ${modelName}`);
                break;
            } catch (modelError: any) {
                console.error(`Model ${modelName} failed:`, modelError.message);
                lastError = modelError;
                continue;
            }
        }

        if (!textResult) {
            throw new Error(`All AI models failed. Last error: ${lastError?.message || 'Unknown error'}`);
        }

        const responseText = textResult.response.text();
        const trip = parseMarkdownToJson(responseText) as any;

        if (!trip || !trip.name) {
            throw new Error("Failed to parse AI response into valid trip data");
        }

        // Fetch images with error handling
        let imageUrls: string[] = [];
        try {
            const imageResponse = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(country)} ${encodeURIComponent(interests)} ${encodeURIComponent(travelStyle)}&client_id=${unsplashApiKey}&per_page=3`
            );

            if (imageResponse.ok) {
                const imageData = await imageResponse.json();
                imageUrls = imageData.results?.slice(0, 3).map((result: any) => result.urls?.regular).filter(Boolean) || [];
            } else {
                console.warn('Unsplash API error:', imageResponse.statusText);
            }
        } catch (imgErr) {
            console.error("Image search error:", imgErr);
            // Continue without images
        }

        // Insert trip into database
        const { data: result, error: insertError } = await supabase
            .from('trips')
            .insert({
                trip_details: JSON.stringify(trip),
                created_at: new Date().toISOString(),
                image_urls: imageUrls.length > 0 ? imageUrls : null,
                user_id: userId,
                name: trip.name || `${country} Trip`,
                estimated_price: trip.estimatedPrice || budget,
                tags: [travelStyle, groupType].filter(Boolean),
                duration: numberOfDays,
                description: trip.description || ""
            })
            .select()
            .single();

        if (insertError) {
            console.error('Database insert error:', insertError);
            throw new Error(`Failed to save trip: ${insertError.message}`);
        }

        // Create Stripe payment link
        let paymentLinkUrl = "";
        try {
            const tripPriceStr = (trip.estimatedPrice || "").replace(/[$,]/g, '').split('-')[0].trim();
            const tripPrice = parseInt(tripPriceStr, 10) || 1000;

            const paymentLink = await createProduct(
                trip.name || "Custom Trip",
                trip.description || "Generated by AI",
                imageUrls,
                tripPrice,
                result.id
            );
            paymentLinkUrl = paymentLink.url;
        } catch (stripeErr: any) {
            console.error("Stripe error:", stripeErr);
            // Continue without payment link - not critical
        }

        // Update trip with payment link if created
        if (paymentLinkUrl) {
            await supabase
                .from('trips')
                .update({ payment_link: paymentLinkUrl })
                .eq('id', result.id);
        }

        console.log(`✅ Trip created successfully: ${result.id}`);
        return data({ id: result.id });

    } catch (e: any) {
        console.error('❌ Error generating travel plan:', e);

        // Provide user-friendly error messages
        let errorMessage = "Failed to generate trip. Please try again.";

        if (e.message?.includes('API key')) {
            errorMessage = "AI service configuration error. Please contact support.";
        } else if (e.message?.includes('parse')) {
            errorMessage = "Failed to process AI response. Please try again.";
        } else if (e.message?.includes('database') || e.message?.includes('save')) {
            errorMessage = "Failed to save trip. Please try again.";
        } else if (e.message?.includes('models failed')) {
            errorMessage = "AI service temporarily unavailable. Please try again in a few moments.";
        }

        return data({
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? e.message : undefined
        }, { status: 500 });
    }
}
