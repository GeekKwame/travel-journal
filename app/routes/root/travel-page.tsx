import { Link, type LoaderFunctionArgs, useSearchParams } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { cn, parseTripData } from "@/lib/utils";
import { Header, TripCard } from "../../../components";
import { getAllTrips } from "~/lib/trips";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";
import type { DestinationProps, Trip } from "~/index";

const FeaturedDestination = ({ containerClass = '', bigCard = false, rating, title, activityCount, bgImage }: DestinationProps) => (
    <section className={cn('rounded-[14px] overflow-hidden bg-cover bg-center size-full min-w-[280px]', containerClass, bgImage)}>
        <div className="bg-linear200 h-full">
            <article className="featured-card">
                <div className={cn('bg-white rounded-20 font-bold text-red-100 w-fit py-px px-3 text-sm')}>
                    {rating}
                </div>

                <article className="flex flex-col gap-3.5">
                    <h2 className={cn('text-lg font-semibold text-white', { 'p-30-bold': bigCard })}>{title}</h2>

                    <figure className="flex gap-2 items-center">
                        <img
                            src="/assets/images/david.webp"
                            alt="user"
                            className={cn('size-4 rounded-full aspect-square', { 'size-11': bigCard })}
                        />
                        <p className={cn('text-xs font-normal text-white', { 'text-lg': bigCard })}>{activityCount} activities</p>
                    </figure>
                </article>
            </article>
        </div>
    </section>
)

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const limit = 8;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || "1", 10);
    const offset = (page - 1) * limit;

    try {
        const { allTrips, total } = await getAllTrips(limit, offset);

        return {
            trips: allTrips.map(({ id, trip_details, image_urls }) => ({
                id,
                ...parseTripData(trip_details),
                imageUrls: image_urls ?? []
            })),
            total
        };
    } catch (error) {
        console.error("Error loading trips:", error);
        return { trips: [], total: 0 };
    }
}

const TravelPage = ({ loaderData }: { loaderData: { trips: Trip[], total: number } }) => {
    const trips = loaderData.trips || [];

    const [searchParams] = useSearchParams();
    const initialPage = Number(searchParams.get('page') || '1')

    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.search = `?page=${page}`
    }

    return (
        <main className="flex flex-col">
            {/* Premium Hero Section */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-900">
                {/* Background Pattern/Gradient */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-indigo-900 to-slate-900" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                </div>

                <div className="wrapper relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
                    <article className="animate-fade-in space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full bg-white/10 text-brand-300 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                            </span>
                            AI Powered Travel
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                            Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">Next Trip</span> with Ease
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
                            Craft personal, handpicked itineraries in seconds. Your next adventure is just an AI-generated plan away.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="#trips">
                                <ButtonComponent className="!bg-brand-600 !text-white !px-8 !py-5 !rounded-2xl !text-base !font-bold hover:!bg-brand-700 hover:!shadow-glow transition-all w-full sm:w-auto">
                                    Get Started
                                </ButtonComponent>
                            </Link>
                            <Link to="/create-trip">
                                <ButtonComponent className="!bg-white/10 !text-white !px-8 !py-5 !rounded-2xl !text-base !font-bold hover:!bg-white/20 border border-white/20 transition-all w-full sm:w-auto">
                                    Start Planning
                                </ButtonComponent>
                            </Link>
                        </div>
                    </article>

                    <div className="hidden lg:block relative">
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]" />
                        <div className="relative glass p-4 rounded-[40px] shadow-2xl animate-float">
                            <img
                                src="/assets/images/hero-img.png"
                                alt="Travel"
                                className="rounded-[32px] w-full object-cover shadow-inner"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="wrapper space-y-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold text-brand-600 uppercase tracking-[0.2em] animate-fade-in">Curated Hotspots</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Featured Destinations</h3>
                        </div>
                        <p className="text-slate-500 max-w-sm text-sm leading-relaxed font-medium">
                            Discover our top-rated locations, hand-selected for unique experiences and unforgettable memories.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[750px]">
                        <div className="md:col-span-8 group relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                            <FeaturedDestination
                                bgImage="bg-card-1"
                                containerClass="h-full"
                                bigCard
                                title="Barcelona Tour"
                                rating={4.2}
                                activityCount={196}
                            />
                        </div>
                        <div className="md:col-span-4 grid grid-rows-2 gap-8">
                            <div className="group relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                <FeaturedDestination
                                    bgImage="bg-card-2"
                                    containerClass="h-full"
                                    title="London"
                                    rating={4.5}
                                    activityCount={512}
                                />
                            </div>
                            <div className="group relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                <FeaturedDestination
                                    bgImage="bg-card-3"
                                    containerClass="h-full"
                                    title="Australia Tour"
                                    rating={3.5}
                                    activityCount={250}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { img: "bg-card-4", title: "Spain Tour", rating: 3.8, count: 150 },
                            { img: "bg-card-5", title: "Japan", rating: 5.0, count: 150 },
                            { img: "bg-card-6", title: "Italy Tour", rating: 4.2, count: 500 },
                        ].map((dest, i) => (
                            <div key={i} className="h-72 group relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                <FeaturedDestination
                                    bgImage={dest.img}
                                    containerClass="h-full"
                                    title={dest.title}
                                    rating={dest.rating}
                                    activityCount={dest.count}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Handpicked Trips Section */}
            <section id="trips" className="py-24 bg-slate-50">
                <div className="wrapper space-y-16">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-sm font-bold text-brand-600 uppercase tracking-[0.2em]">Our Collection</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Handpicked Trips</h3>
                        <p className="text-slate-500 font-medium">
                            Browse professional itineraries designed to match your specific travel style and budget.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trips.length > 0 ? (
                            trips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    id={trip.id.toString()}
                                    name={trip.name || 'Unnamed Trip'}
                                    imageUrl={trip.imageUrls?.[0] || '/assets/images/sample.jpeg'}
                                    location={trip.itinerary?.[0]?.location ?? ""}
                                    tags={[trip.interests, trip.travelStyle].filter(Boolean) as string[]}
                                    price={trip.estimatedPrice || '$0'}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-24 glass rounded-[40px] text-center border-dashed border-2 border-slate-200">
                                <p className="text-slate-400 font-bold text-lg">No trips available yet.</p>
                                <p className="text-slate-400 text-sm mt-2">Check back soon for new adventures!</p>
                            </div>
                        )}
                    </div>

                    {loaderData.total > 8 && (
                        <div className="flex justify-center pt-12">
                            <PagerComponent
                                totalRecordsCount={loaderData.total}
                                pageSize={8}
                                currentPage={currentPage}
                                click={(args: any) => handlePageChange(args.currentPage)}
                                cssClass="!border-none !shadow-md !rounded-2xl overflow-hidden glass"
                            />
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
export default TravelPage

