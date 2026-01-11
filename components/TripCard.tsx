import { Link, useLocation } from "react-router";
import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";
import { cn, getFirstWord } from "@/lib/utils";
import type { DashboardTrip, TripCardProps } from '~/index';

// Support both old format (trip object) and new format (individual props)
const TripCard = (props: { trip: DashboardTrip } | TripCardProps) => {
    const path = useLocation();

    // Handle both prop formats
    let id: string;
    let name: string;
    let location: string;
    let imageUrl: string;
    let tags: string[];
    let price: string;

    if ('trip' in props) {
        // Old format with trip object
        const trip = props.trip;
        id = trip.id.toString();
        name = trip.name;
        location = trip.itinerary?.[0]?.location || 'Unknown Location';
        imageUrl = trip.imageUrls?.[0] || '/assets/images/sample.jpeg';
        tags = trip.tags || [];
        price = trip.estimatedPrice;
    } else {
        // New format with individual props
        id = props.id;
        name = props.name;
        location = props.location;
        imageUrl = props.imageUrl;
        tags = props.tags || [];
        price = props.price;
    }

    return (
        <Link
            to={path.pathname === '/' || path.pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id}`}
            className="group block relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover-scale hover-glow transition-all duration-300 shadow-sm hover:shadow-xl"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 glass rounded-full text-xs font-bold text-slate-800 shadow-lg">
                        {price}
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
            </div>

            <article className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-brand-600 font-bold text-[10px] uppercase tracking-wider">
                    <img
                        src="/assets/icons/location-mark.svg"
                        alt="location"
                        className="size-3 filter saturate-200 brightness-125"
                    />
                    {location}
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-brand-600 transition-colors">
                    {name}
                </h2>

                <div className="flex flex-wrap gap-2 mt-1">
                    {tags?.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className={cn(
                                "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight",
                                index === 1 ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                            )}
                        >
                            {getFirstWord(tag)}
                        </span>
                    ))}
                </div>
            </article>
        </Link>
    )
}
export default TripCard
