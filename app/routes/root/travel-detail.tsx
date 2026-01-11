import { Link, type LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "~/lib/trips";
import { cn, getFirstWord, parseTripData } from "@/lib/utils";
import { Header, InfoPill, TripCard } from "@/components";
import { ButtonComponent, ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";
import type { Trip, DayPlan } from "~/index";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;
    if (!tripId) throw new Error('Trip ID is required');

    const [trip, trips] = await Promise.all([
        getTripById(tripId),
        getAllTrips(4, 0)
    ]);

    return {
        trip,
        allTrips: trips.allTrips.map(({ id, trip_details, image_urls, name, estimated_price, itinerary }) => ({
            id,
            ...parseTripData(trip_details),
            imageUrls: image_urls ?? []
        }))
    }
}

const TravelDetail = ({ loaderData }: any) => {
    const imageUrls = loaderData?.trip?.image_urls || [];
    const tripData = parseTripData(loaderData?.trip?.trip_details);
    const paymentLink = loaderData?.trip?.payment_link;

    const {
        name, duration, itinerary, travelStyle,
        groupType, budget, interests, estimatedPrice,
        description, bestTimeToVisit, weatherInfo, country
    } = tripData || {};
    const allTrips = loaderData.allTrips as Trip[] | [];

    const pillItems = [
        { text: travelStyle, bg: '!bg-pink-50 !text-pink-500' },
        { text: groupType, bg: '!bg-primary-50 !text-primary-500' },
        { text: budget, bg: '!bg-success-50 !text-success-700' },
        { text: interests, bg: '!bg-navy-50 !text-navy-500' },
    ]

    const visitTimeAndWeatherInfo = [
        { title: 'Best Time to Visit:', items: bestTimeToVisit },
        { title: 'Weather:', items: weatherInfo }
    ]

    return (
        <main className="min-h-screen bg-white pb-32 pt-24">
            <div className="wrapper space-y-12">
                <nav className="flex items-center justify-between">
                    <Link to="/" className="group flex items-center gap-2 text-slate-500 hover:text-brand-600 font-bold text-sm transition-colors uppercase tracking-widest">
                        <div className="p-2 glass rounded-xl group-hover:bg-brand-50 transition-all">
                            <img src="/assets/icons/arrow-left.svg" alt="back icon" className="size-4" />
                        </div>
                        Go back
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="px-5 py-2 glass rounded-full text-brand-600 font-bold text-sm border border-brand-100 shadow-sm">
                            {estimatedPrice}
                        </div>
                    </div>
                </nav>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <header className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg">
                                {duration} Day {travelStyle} Plan
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                                {name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <InfoPill
                                    text={`${duration} Days`}
                                    image="/assets/icons/calendar.svg"
                                />
                                <InfoPill
                                    text={country || 'Unknown'}
                                    image="/assets/icons/location-mark.svg"
                                />
                            </div>
                        </header>

                        {/* Gallery */}
                        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {imageUrls.map((url: string, i: number) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500",
                                        i === 0 ? "md:col-span-4 md:h-[450px]" : "md:col-span-1 h-[180px]"
                                    )}
                                >
                                    <img src={url || ''} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </section>

                        {/* Description & Tags */}
                        <div className="space-y-8 glass p-8 md:p-12 rounded-[40px] border border-slate-100">
                            <article className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900">About this journey</h2>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">{description}</p>
                            </article>

                            <div className="flex flex-wrap gap-3">
                                {[travelStyle, groupType, budget, interests].filter(Boolean).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl border border-slate-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Itinerary */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Daily Itinerary</h2>
                                <div className="h-px flex-grow bg-slate-200" />
                            </div>

                            <ul className="space-y-12">
                                {itinerary?.map((dayPlan: DayPlan, index: number) => (
                                    <li key={index} className="relative pl-12 before:absolute before:left-4 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100 last:before:hidden">
                                        <div className="absolute left-0 top-0 size-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-glow z-10">
                                            {dayPlan.day}
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold text-slate-900">{dayPlan.location}</h3>
                                            <div className="grid gap-6">
                                                {dayPlan.activities.map((activity, animI: number) => (
                                                    <div
                                                        key={animI}
                                                        className="glass p-6 rounded-[24px] border border-white hover:border-brand-100 transition-colors shadow-sm"
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <span className="shrink-0 px-3 py-1 bg-brand-50 text-brand-600 text-[10px] font-bold uppercase rounded-lg">
                                                                {activity.time}
                                                            </span>
                                                            <p className="text-slate-600 font-medium leading-relaxed">{activity.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Essential Info */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {visitTimeAndWeatherInfo.map((section) => (
                                <section key={section.title} className="glass p-8 rounded-[32px] border border-slate-100 space-y-6">
                                    <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                                    <ul className="space-y-4">
                                        {section.items?.map((item: string, i: number) => (
                                            <li key={i} className="flex gap-3 text-slate-600 font-medium">
                                                <div className="size-1.5 bg-brand-400 rounded-full mt-2 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sidebar / Action */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
                        <div className="glass p-8 rounded-[40px] shadow-2xl border border-brand-100/30 overflow-hidden relative">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

                            <div className="relative space-y-8">
                                <div className="space-y-2 text-center">
                                    <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest">Pricing Model</h3>
                                    <div className="text-5xl font-bold text-slate-900 tracking-tighter">
                                        {estimatedPrice}
                                    </div>
                                    <p className="text-slate-400 text-xs font-medium">Inclusive of all AI planning fees</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                        <div className="size-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
                                        <span className="text-emerald-700 text-sm font-bold">Optimized for {budget}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                        <div className="size-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px]">✨</div>
                                        <span className="text-indigo-700 text-sm font-bold">Smart Itinerary Tracking</span>
                                    </div>
                                </div>

                                <a href={paymentLink} className="block group">
                                    <ButtonComponent
                                        className="!bg-brand-600 !text-white !h-20 !w-full !rounded-[24px] !text-xl !font-bold hover:!bg-brand-700 hover:!shadow-glow transition-all"
                                        type="submit"
                                    >
                                        <span className="flex flex-col items-center">
                                            <span>Reserve Trip</span>
                                            <span className="text-[10px] opacity-70 font-medium tracking-widest uppercase">Secured by Stripe</span>
                                        </span>
                                    </ButtonComponent>
                                </a>

                                <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                    100% Satisfaction Guaranteed
                                </p>
                            </div>
                        </div>

                        {/* Recent Popular Trips in Sidebar style or below */}
                    </aside>
                </section>
            </div>

            <section className="flex flex-col gap-6">
                <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>

                <div className="trip-grid">
                    {allTrips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id}
                            name={trip.name}
                            imageUrl={trip.imageUrls[0]}
                            location={trip.itinerary?.[0]?.location ?? ""}
                            tags={[trip.interests, trip.travelStyle]}
                            price={trip.estimatedPrice}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}
export default TravelDetail
