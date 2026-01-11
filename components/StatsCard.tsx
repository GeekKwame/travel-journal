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
        <article className="glass p-6 rounded-[32px] shadow-sm border border-white/50 hover-scale transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {headerTitle}
                </h3>
                <div className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1",
                    isDecrement ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                )}>
                    <img
                        src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`}
                        className="size-3"
                        alt="arrow"
                    />
                    {Math.round(percentage)}%
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-end gap-2">
                    <h2 className="text-4xl font-bold text-slate-900 leading-none">{total}</h2>
                    <span className="text-xs font-medium text-slate-400 pb-1">Total count</span>
                </div>

                <div className="relative h-16 w-full opacity-60">
                    <img
                        src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`}
                        className="w-full h-full object-contain filter saturate-150"
                        alt="trend graph"
                    />
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                    Compared to last month
                </p>
            </div>
        </article>
    )
}

export default StatsCard
