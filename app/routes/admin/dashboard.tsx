import { Header, StatsCard, TripCard } from "../../../components";
import { getUsersAndTripsStats } from "~/lib/dashboard";
import { getAllTrips } from "~/lib/trips";
import { useLoaderData } from "react-router";
import { parseTripData } from "@/lib/utils";

export async function clientLoader() {
  try {
    const [stats, recentTrips] = await Promise.all([
      getUsersAndTripsStats(),
      getAllTrips(4, 0)
    ]);

    return {
      stats,
      recentTrips: recentTrips.allTrips
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    return {
      stats: null,
      recentTrips: []
    };
  }
}

const Dashboard = () => {
  const { stats, recentTrips } = useLoaderData<typeof clientLoader>();

  // Fallback values in case stats loading fails
  const totalUsers = stats?.totalUsers || 0;
  const usersJoined = stats?.usersJoined || { currentMonth: 0, lastMonth: 0 };
  const totalTrips = stats?.totalTrips || 0;
  const tripsCreated = stats?.tripsCreated || { currentMonth: 0, lastMonth: 0 };
  const userRole = stats?.userRole || { total: 0, currentMonth: 0, lastMonth: 0 };

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 pt-6">
      <div className="wrapper space-y-12">
        <Header
          title={`Welcome Admin 👋`}
          description="Track activity, trends and popular destinations in real time. Your command center for platform growth."
        />

        {/* Stats Grid */}
        <section className="animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatsCard
              headerTitle="Total Users"
              total={totalUsers}
              currentMonthCount={usersJoined.currentMonth}
              lastMonthCount={usersJoined.lastMonth}
            />

            <StatsCard
              headerTitle="Total Trips"
              total={totalTrips}
              currentMonthCount={tripsCreated.currentMonth}
              lastMonthCount={tripsCreated.lastMonth}
            />

            <StatsCard
              headerTitle="Active Users"
              total={userRole.total}
              currentMonthCount={userRole.currentMonth}
              lastMonthCount={userRole.lastMonth}
            />
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Trip Generations</h2>
              <p className="text-sm text-slate-500 font-medium">Latest itineraries created by your users.</p>
            </div>
            <button className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors uppercase tracking-widest">
              View All Activity →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentTrips.length > 0 ? (
              recentTrips.map((trip: any) => {
                const trip_details = parseTripData(trip.trip_details);
                return (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    name={trip.name}
                    imageUrl={trip.image_urls?.[0] || '/assets/images/sample.jpeg'}
                    location={trip_details?.itinerary?.[0]?.location || 'Unknown Location'}
                    tags={trip.tags || []}
                    price={trip.estimated_price}
                  />
                )
              })
            ) : (
              <div className="col-span-full py-20 glass rounded-[40px] text-center border-dashed border-2 border-slate-200">
                <p className="text-slate-400 font-bold">No trips created yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;