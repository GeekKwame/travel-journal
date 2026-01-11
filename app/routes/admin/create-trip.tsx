import { Header } from "../../../components";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "@/lib/utils";
import { LayerDirective, LayersDirective, MapsComponent } from "@syncfusion/ej2-react-maps";
import React, { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { getUser } from "~/lib/auth";
import { useNavigate, useLoaderData } from "react-router";
import type { TripFormData } from "~/index";

interface Country {
    name: string;
    coordinates: [number, number];
    value: string;
    openStreetMap: string;
}

interface CreateTripResponse {
    id?: string;
    error?: string;
}

export const clientLoader = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,latlng,maps');

        if (!response.ok) {
            console.error('Failed to fetch countries:', response.statusText);
            // Return a default country list if API fails
            return [{
                name: "🇺🇸 United States",
                coordinates: [37.09024, -95.712891],
                value: "United States",
                openStreetMap: "https://www.openstreetmap.org/relation/148838"
            }];
        }

        const data = await response.json();

        return data.map((country: any) => ({
            name: country.flag + " " + country.name.common,
            coordinates: country.latlng || [0, 0],
            value: country.name.common,
            openStreetMap: country.maps?.openStreetMap || "",
        }));
    } catch (error) {
        console.error('Error loading countries:', error);
        // Return fallback data
        return [{
            name: "🇺🇸 United States",
            coordinates: [37.09024, -95.712891],
            value: "United States",
            openStreetMap: "https://www.openstreetmap.org/relation/148838"
        }];
    }
}

// Export loader for SSR compatibility
export const loader = clientLoader;

const CreateTrip = () => {
    const loaderData = useLoaderData<typeof clientLoader>();
    const countries = loaderData as Country[];
    const navigate = useNavigate();

    const [formData, setFormData] = useState<TripFormData>({
        country: countries[0]?.name || '',
        travelStyle: '',
        interest: '',
        budget: '',
        duration: 0,
        groupType: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);

        if (
            !formData.country ||
            !formData.travelStyle ||
            !formData.interest ||
            !formData.budget ||
            !formData.groupType
        ) {
            setError('Please provide values for all fields');
            setLoading(false)
            return;
        }

        if (formData.duration < 1 || formData.duration > 10) {
            setError('Duration must be between 1 and 10 days');
            setLoading(false)
            return;
        }

        let user;
        try {
            user = await getUser();
            if (!user) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }
        } catch (e) {
            console.error('Error fetching user', e);
            setError('User not authenticated');
            setLoading(false);
            return;
        }

        const isAdminFlow = window.location.pathname.startsWith('/admin');

        try {
            const response = await fetch('/api/create-trip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country: formData.country,
                    numberOfDays: formData.duration,
                    travelStyle: formData.travelStyle,
                    interests: formData.interest,
                    budget: formData.budget,
                    groupType: formData.groupType,
                    userId: user.id
                })
            })

            const result: CreateTripResponse = await response.json();

            if (result?.id) {
                if (isAdminFlow) {
                    navigate(`/admin/trip/${result.id}`); // Redirect to admin trip details
                } else {
                    navigate(`/travel/${result.id}`); // Redirect to public travel details
                }
            }
            else {
                console.error('Failed to generate a trip');
                setError(result.error || 'Failed to generate trip');
            }
        } catch (e) {
            console.error('Error generating trip', e);
            setError('Error generating trip');
        } finally {
            setLoading(false)
        }
    };

    const handleChange = (key: keyof TripFormData, value: string | number) => {
        setFormData({ ...formData, [key]: value })
    }
    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value,
    }))

    const mapData = [
        {
            country: formData.country,
            color: '#EA382E',
            coordinates: countries.find((c: Country) => c.name === formData.country)?.coordinates || []
        }
    ]

    const isPublicView = !window.location.pathname.startsWith('/admin');

    return (
        <main className={cn("flex flex-col gap-12 pb-32 pt-24", { "bg-slate-50": isPublicView })}>
            <div className="wrapper">
                <Header
                    title="Design Your AI Trip"
                    description="Fill in your preferences and let our AI curate the perfect itinerary for you. Your dream vacation is just a few clicks away."
                />
            </div>

            <section className="wrapper max-w-4xl">
                <form
                    className="glass p-8 md:p-12 rounded-[40px] shadow-xl border border-white/50 space-y-10 animate-fade-in"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Country Selection */}
                        <div className="space-y-3">
                            <label htmlFor="country" className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                Destination Country
                            </label>
                            <ComboBoxComponent
                                id="country"
                                dataSource={countryData}
                                fields={{ text: 'text', value: 'value' }}
                                placeholder="Where are you going?"
                                cssClass="!bg-white/50 !border-slate-200 !rounded-2xl !p-2 !text-slate-800"
                                change={(e: { value: string | undefined }) => {
                                    if (e.value) {
                                        handleChange('country', e.value)
                                    }
                                }}
                                allowFiltering
                                filtering={(e: any) => {
                                    const query = e.text.toLowerCase();
                                    e.updateData(
                                        countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => ({
                                            text: country.name,
                                            value: country.value
                                        })))
                                    )
                                }}
                            />
                        </div>

                        {/* Duration */}
                        <div className="space-y-3">
                            <label htmlFor="duration" className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                Duration (Days)
                            </label>
                            <input
                                id="duration"
                                name="duration"
                                type="number"
                                min="1"
                                max="10"
                                placeholder="How many days?"
                                className="w-full bg-white/50 border border-slate-200 rounded-2xl p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400"
                                onChange={(e) => handleChange('duration', Number(e.target.value))}
                            />
                        </div>

                        {/* Other Selects */}
                        {selectItems.map((key: keyof TripFormData) => (
                            <div key={key} className="space-y-3">
                                <label htmlFor={key} className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                                    {formatKey(key)}
                                </label>
                                <ComboBoxComponent
                                    id={key}
                                    dataSource={comboBoxItems[key].map((item: string) => ({
                                        text: item,
                                        value: item,
                                    }))}
                                    fields={{ text: 'text', value: 'value' }}
                                    placeholder={`Select ${formatKey(key)}`}
                                    cssClass="!bg-white/50 !border-slate-200 !rounded-2xl !p-2 !text-slate-800"
                                    change={(e: { value: string | undefined }) => {
                                        if (e.value) {
                                            handleChange(key, e.value)
                                        }
                                    }}
                                    allowFiltering
                                    filtering={(e: any) => {
                                        const query = e.text.toLowerCase();
                                        e.updateData(
                                            comboBoxItems[key]
                                                .filter((item: string) => item.toLowerCase().includes(query))
                                                .map((item: string) => ({
                                                    text: item,
                                                    value: item,
                                                })))
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Map Section */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                            Interactive World View
                        </label>
                        <div className="rounded-[32px] overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
                            <MapsComponent height="300px" background="transparent">
                                <LayersDirective>
                                    <LayerDirective
                                        shapeData={world_map}
                                        dataSource={mapData}
                                        shapePropertyPath="name"
                                        shapeDataPath="country"
                                        shapeSettings={{ colorValuePath: "color", fill: "#E2E8F0" }}
                                    />
                                </LayersDirective>
                            </MapsComponent>
                        </div>
                    </div>

                    <div className="h-px bg-slate-200 w-full opacity-50" />

                    {error && (
                        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 animate-slide-in">
                            <div className="p-1 bg-red-500 rounded-full text-white text-[10px]">✕</div>
                            <p className="text-red-600 text-sm font-semibold">{error}</p>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <ButtonComponent
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "!h-16 !px-12 !rounded-2xl !text-lg !font-bold transition-all duration-300 w-full md:!w-auto",
                                loading
                                    ? "!bg-slate-200 !text-slate-400"
                                    : "!bg-brand-600 !text-white hover:!bg-brand-700 hover:!shadow-glow"
                            )}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <img
                                    src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`}
                                    className={cn("size-6 filter invert", { 'animate-spin': loading })}
                                />
                                <span>{loading ? 'Curating your trip...' : 'Generate Itinerary'}</span>
                            </div>
                        </ButtonComponent>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default CreateTrip
