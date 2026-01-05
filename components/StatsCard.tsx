import { calculateTrendPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { StatsCard as StatsCardProps } from '~/index';

const StatsCard = ({ 
    headerTitle, 
    total, 
    currentMonthCount, 
    lastMonthCount }: StatsCardProps) => {
    const { trend, percentage } = calculateTrendPercentage(
        currentMonthCount,
        lastMonthCount
    );

    const isDecrement = trend === "decrement";
    
  return (
    <article className="stats-card">
        <h3 className="text-base font-medium">
            {headerTitle}
        </h3>

        <div className="content">
            <h2 className="text-4xl font-semibold mb-1">{total}</h2>
            <div className="flex items-center gap-2 mb-3">
                <figure className="flex items-center gap-1">
                    <img
                        src={`/assets/icons/${isDecrement ? 
                            'arrow-down-red.svg' : 'arrow-up-green.svg'}`}
                        className="size-5"
                        alt="arrow"
                    />
                    <figcaption className={cn('text-sm font-medium', isDecrement ? 'text-red-500' : 'text-green-500')}>
                        {Math.round(percentage)}%
                    </figcaption>
                </figure>
                <p className="text-sm font-medium text-gray-100 truncate">vs last month</p>
            </div>

            <img src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`} className="w-full h-20 object-contain" alt="trend graph"/>
        </div>
    </article>
  )
}

export default StatsCard
