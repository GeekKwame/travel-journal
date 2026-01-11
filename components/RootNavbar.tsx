import React from 'react'
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { logoutUser } from "~/lib/auth";
import { cn } from "@/lib/utils";

interface RootNavbarProps {
    user?: {
        status?: string;
        image_url?: string;
    } | null;
}

const RootNavbar = ({ user }: RootNavbarProps) => {
    const navigate = useNavigate();
    const location = useLocation()
    const params = useParams();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/sign-in')
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <nav className={cn(
            'w-full fixed top-0 z-50 transition-all duration-300',
            location.pathname === '/' ? 'bg-transparent' : 'glass border-b border-brand-100/20'
        )}>
            <div className="wrapper py-4 flex items-center justify-between">
                <Link to='/' className="flex items-center gap-2 group">
                    <div className="p-2 glass rounded-xl group-hover:shadow-glow transition-all duration-300">
                        <img src="/assets/icons/logo.svg" alt="logo" className="size-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tourvisto</h1>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-6">
                        {[
                            { label: 'Explore', path: '/' },
                            ...(user ? [
                                { label: 'My Trips', path: '/my-trips' },
                                { label: 'AI Planner', path: '/create-trip' }
                            ] : []),
                            ...(user?.status === 'admin' ? [{ label: 'Admin', path: '/dashboard' }] : [])
                        ].map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-brand-600',
                                    location.pathname === item.path ? 'text-brand-600' : 'text-slate-600'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="h-6 w-px bg-slate-200 mx-2" />

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 p-1 pr-3 glass rounded-full">
                                <img
                                    src={user?.image_url || '/assets/images/david.webp'}
                                    alt="user"
                                    referrerPolicy="no-referrer"
                                    className="rounded-full size-8 object-cover border border-white/50"
                                />
                                <span className="text-xs font-semibold text-slate-700">Account</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors group"
                                title="Logout"
                            >
                                <img
                                    src="/assets/icons/logout.svg"
                                    alt="logout"
                                    className="size-5 rotate-180 group-hover:scale-110 transition-transform filter brightness-0 opacity-60"
                                />
                            </button>
                        </div>
                    ) : (
                        <Link to="/sign-in" className="px-6 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 hover:shadow-glow transition-all">
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle (Simplified for now) */}
                <button className="md:hidden p-2 glass rounded-lg">
                    <div className="w-5 h-0.5 bg-slate-600 mb-1" />
                    <div className="w-5 h-0.5 bg-slate-600 mb-1" />
                    <div className="w-5 h-0.5 bg-slate-600" />
                </button>
            </div>
        </nav>
    )
}
export default RootNavbar

