import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, Heart, User, Sparkles } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { UserProfileModal } from './UserProfileModal';
import { SurpriseMeModal } from './SurpriseMeModal';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { wishlist } = useTravel();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  const navLinks = [
    { label: 'Explore', path: '/explore' },
    { label: 'Trip Planner', path: '/planner' },
    { label: 'Budget Calculator', path: '/budget' },
    { label: 'Hidden Gems', path: '/hidden-gems' },
    { label: 'Weather', path: '/weather' },
    { label: 'Group Trips', path: '/group-trips' },
    { label: 'Wishlist', path: '/wishlist', badge: wishlist.length > 0 ? wishlist.length : undefined }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DC] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-[#1E2923] hover:text-[#1E4D3A] transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1E4D3A] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-[#FAF8F5] stroke-[2]" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display text-[#1E2923]">
              TripBuddy
            </span>
          </Link>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#64748B]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#1E4D3A] ${
                    active ? 'text-[#1E4D3A] font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#1E4D3A] text-white tabular-nums">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4D3A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Profile/Surprise Affordance */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsSurpriseOpen(true)}
              className="px-3 py-2 text-xs font-medium text-[#1E2923] hover:text-[#1E4D3A] bg-transparent hover:bg-[#F0ECE4] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Surprise me with a destination"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D95328]" />
              <span className="hidden xl:inline">Surprise Me</span>
            </button>

            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="p-2 text-[#64748B] hover:text-[#1E2923] hover:bg-[#F0ECE4] rounded-lg transition-colors whitespace-nowrap shrink-0"
              aria-label="User preferences and settings"
              title="Traveler Profile & Preferences"
            >
              <User className="w-4 h-4" />
            </button>

            <Link
              to="/planner"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1E4D3A] hover:bg-[#163A2C] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Plan My Trip
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="p-2 text-[#64748B] hover:text-[#1E2923] rounded-lg"
              aria-label="Traveler profile"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1E2923] hover:bg-[#F0ECE4] rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE5DC] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#1E4D3A] text-white font-semibold'
                      : 'text-[#1E2923] hover:bg-[#F0ECE4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full tabular-nums ${
                        active ? 'bg-white/20 text-white' : 'bg-[#1E4D3A] text-white'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#EAE5DC] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSurpriseOpen(true);
                }}
                className="w-full py-2.5 px-3 text-xs font-semibold text-[#1E2923] bg-white border border-[#EAE5DC] rounded-xl flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#D95328]" />
                <span>Surprise Me With a Destination</span>
              </button>

              <Link
                to="/planner"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 text-xs font-semibold text-center text-white bg-[#1E4D3A] rounded-xl shadow-xs"
              >
                Plan My Trip
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <SurpriseMeModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
      />
    </>
  );
};
