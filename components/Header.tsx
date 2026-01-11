import { useLocation } from 'react-router'
import { cn } from "@/lib/utils"

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  const location = useLocation();

  return (
    <header className="flex flex-col gap-3 py-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-brand-600 rounded-full" />
        <h1 className={cn("text-slate-900 tracking-tight",
          location.pathname === '/' ? 'text-3xl md:text-5xl font-bold' :
            'text-2xl md:text-3xl font-bold')}>
          {title}
        </h1>
      </div>
      <p className={cn("text-slate-500 font-medium leading-relaxed max-w-2xl",
        location.pathname === '/' ? 'text-lg md:text-xl' :
          'text-base md:text-lg')}>
        {description}
      </p>
    </header>
  )
}

export default Header
