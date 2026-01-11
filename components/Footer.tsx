import React from 'react';
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="w-full bg-slate-900 text-slate-300 py-16">
            <div className="wrapper grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
                    <Link to='/' className="flex items-center gap-2 group w-fit">
                        <div className="p-2 glass rounded-xl bg-white/5">
                            <img src="/assets/icons/logo.svg" alt="logo" className="size-6 filter invert brightness-200" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Tourvisto</h1>
                    </Link>
                    <p className="text-sm leading-relaxed opacity-70">
                        Designing the future of travel with AI-powered itineraries and premium experiences.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <h3 className="text-white font-semibold uppercase tracking-wider text-xs">Explore</h3>
                    <nav className="flex flex-col gap-3">
                        <Link to="/" className="text-sm hover:text-brand-400 transition-colors">Destinations</Link>
                        <Link to="/create-trip" className="text-sm hover:text-brand-400 transition-colors">AI Planner</Link>
                        <Link to="/my-trips" className="text-sm hover:text-brand-400 transition-colors">My Trips</Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-6">
                    <h3 className="text-white font-semibold uppercase tracking-wider text-xs">Company</h3>
                    <nav className="flex flex-col gap-3">
                        <Link to="#" className="text-sm hover:text-brand-400 transition-colors">About Us</Link>
                        <Link to="#" className="text-sm hover:text-brand-400 transition-colors">Terms of Service</Link>
                        <Link to="#" className="text-sm hover:text-brand-400 transition-colors">Privacy Policy</Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-6">
                    <h3 className="text-white font-semibold uppercase tracking-wider text-xs">Newsletter</h3>
                    <p className="text-sm opacity-70">Get the latest travel tips and deals.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-500 transition-colors"
                        />
                        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="wrapper mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs opacity-50">© 2026 Tourvisto. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                        <span className="sr-only">Twitter</span>
                        {/* Twitter Icon */}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
