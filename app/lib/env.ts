// Environment variable validation utility
// Validates all required environment variables and provides helpful error messages

const requiredEnvVars = {
    // Gemini AI
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,

    // Unsplash
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,

    // Stripe
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    // Supabase
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,

    // Base URL
    VITE_BASE_URL: process.env.VITE_BASE_URL,

    // Admin
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
} as const;

export function validateEnvironment() {
    const missing: string[] = [];

    for (const [key, value] of Object.entries(requiredEnvVars)) {
        if (!value || value.trim() === '') {
            missing.push(key);
        }
    }

    if (missing.length > 0) {
        const errorMessage = `
❌ Missing required environment variables:
${missing.map(key => `  - ${key}`).join('\n')}

Please add these to your .env.local file.
See .env.example for reference.
    `.trim();

        console.error(errorMessage);
        throw new Error(`Missing environment variables: ${missing.join(', ')}`);
    }

    console.log('✅ All required environment variables are configured');
}

// Export typed environment object
export const env = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY!,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL!,
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY!,
    VITE_BASE_URL: process.env.VITE_BASE_URL!,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL!,
} as const;
