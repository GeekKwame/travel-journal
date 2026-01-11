import { getAllTrips } from '~/lib/trips';
import { useLoaderData, Link, redirect } from 'react-router';
import Header from '@/components/Header';
import { TripCard } from '../../../components';
import { getUser } from '~/lib/auth';
import { parseTripData } from '@/lib/utils';

export async function clientLoader() {
    try {
        const user = await getUser();
        if (!user) return redirect('/sign-in');

        const { allTrips } = await getAllTrips(100, 0);
        // Filter trips by the current user's ID
        const myTrips = allTrips.filter((trip: any) => trip.user_id === user.id);

        return {
            trips: myTrips.map(trip => ({
                ...trip,
                details: parseTripData(trip.trip_details)
            }))
        };
    } catch (error) {
        console.error("Error loading my trips:", error);
        return { trips: [] };
    }
}

const MyTrips = () => {
    const { trips } = useLoaderData<typeof clientLoader>();

    return (
        <main className="min-h-screen bg-slate-50/50 pt-32 pb-32">
            <div className="wrapper space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <Header
                        title="My Travel Experiences"
                        description="View and manage all your personally curated AI travel plans in one place."
                    />
                    <Link to="/create-trip">
                        <ButtonComponent className="!bg-brand-600 !text-white !px-8 !py-4 !rounded-2xl !text-base !font-bold hover:!bg-brand-700 hover:!shadow-glow transition-all flex items-center gap-2">
                            <img src="/assets/icons/magic-star.svg" alt="magic" className="size-5 filter invert" />
                            Plan New Trip
                        </ButtonComponent>
                    </Link>
                </div>

                <section className="animate-fade-in">
                    {trips.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trips.map((trip: any) => (
                                <TripCard
                                    key={trip.id}
                                    id={trip.id}
                                    name={trip.name}
                                    imageUrl={trip.image_urls?.[0] || '/assets/images/sample.jpeg'}
                                    location={trip.details?.itinerary?.[0]?.location || 'Unknown Location'}
                                    tags={trip.tags || []}
                                    price={trip.estimated_price}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 glass rounded-[40px] border-dashed border-2 border-slate-200 text-center space-y-6">
                            <div className="size-20 bg-brand-50 rounded-full flex items-center justify-center animate-float">
                                <img src="/assets/icons/magic-star.svg" className="size-10 opacity-40" alt="empty" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-slate-900">No trips generated yet</h3>
                                <p className="text-slate-500 max-w-sm mx-auto font-medium">
                                    Your personal travel collection is empty. Let's create something extraordinary with AI.
                                </p>
                            </div>
                            <Link to="/create-trip">
                                <ButtonComponent className="!bg-brand-600/10 !text-brand-600 !px-8 !py-3 !rounded-xl !font-bold hover:!bg-brand-600 hover:!text-white transition-all">
                                    Start Your First Plan
                                </ButtonComponent>
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default MyTrips;
