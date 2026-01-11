import type { InfoPillProps } from "~/index";

const InfoPill = ({ text, image }: InfoPillProps) => {
    return (
        <figure className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-xl border border-white/50 shadow-sm animate-fade-in">
            <img src={image} alt={text} className="size-4 filter saturate-150" />
            <figcaption className="text-xs font-bold text-slate-600 uppercase tracking-tight">{text}</figcaption>
        </figure>
    )
}
export default InfoPill
