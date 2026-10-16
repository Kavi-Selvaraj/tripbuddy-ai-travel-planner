import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#142B21] text-[#E0E7E3] pt-16 pb-12 border-t border-[#1C3A2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#234537]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-[#27674E] text-white flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5 text-[#FAF8F5] stroke-[2]" />
              </div>
              <span className="text-xl font-bold tracking-tight font-display text-white">
                TripBuddy
              </span>
            </Link>
            <p className="text-sm text-[#A3B8AD] leading-relaxed max-w-sm">
              Less Planning Stress. More Travel Stories. Your personal travel companion for discovering authentic destinations, planning day-by-day itineraries, and collaborating with friends across India.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#829E90] block mb-2">
                Join 24,000+ Smart Travellers
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#0D1E17] border border-[#234537] text-white placeholder-[#78887E] focus:outline-hidden focus:border-[#4E9B79]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D95328] hover:bg-[#C2451E] text-white text-xs font-semibold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {isSubscribed ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span>Subscribe</span>}
                </button>
              </form>
              {isSubscribed && (
                <p className="text-[11px] text-emerald-400 mt-1.5 animate-in fade-in">
                  ✓ Welcome! You will receive our weekly curated destination dispatch.
                </p>
              )}
            </div>
          </div>

          {/* Col 2: Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Discover India</h4>
            <ul className="space-y-2 text-xs text-[#A3B8AD]">
              <li><Link to="/destination/coorg" className="hover:text-white transition-colors">Coorg, Karnataka</Link></li>
              <li><Link to="/destination/hampi" className="hover:text-white transition-colors">Hampi Heritage</Link></li>
              <li><Link to="/destination/goa" className="hover:text-white transition-colors">South & North Goa</Link></li>
              <li><Link to="/destination/munnar" className="hover:text-white transition-colors">Munnar Tea Hills</Link></li>
              <li><Link to="/destination/jaipur" className="hover:text-white transition-colors">Jaipur Pink City</Link></li>
              <li><Link to="/destination/meghalaya" className="hover:text-white transition-colors">Meghalaya Waterfalls</Link></li>
              <li><Link to="/explore" className="text-[#E65F2B] font-semibold hover:underline inline-flex items-center gap-1">All Destinations <ArrowRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Col 3: Tools & Planners */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Travel Engines</h4>
            <ul className="space-y-2 text-xs text-[#A3B8AD]">
              <li><Link to="/planner" className="hover:text-white transition-colors">Personalized Trip Planner</Link></li>
              <li><Link to="/budget" className="hover:text-white transition-colors">Smart Budget Calculator</Link></li>
              <li><Link to="/hidden-gems" className="hover:text-white transition-colors">Hidden Gems Explorer</Link></li>
              <li><Link to="/weather" className="hover:text-white transition-colors">Weather-Aware Suggestions</Link></li>
              <li><Link to="/group-trips" className="hover:text-white transition-colors">Group Trip & Split Expenses</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Saved Trips & Wishlist</Link></li>
            </ul>
          </div>

          {/* Col 4: Inspiration & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Guides & Ethics</h4>
            <ul className="space-y-2 text-xs text-[#A3B8AD]">
              <li><Link to="/guides" className="hover:text-white transition-colors">Backpacking India on a Budget</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Universal Packing Checklist</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Responsible Leave No Trace</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">South India Weekend Routes</Link></li>
              <li className="pt-2 text-[11px] text-[#768F82] leading-tight">
                Crafted with authentic travel intelligence and transparent local guidance.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#768F82]">
          <div className="flex items-center gap-3">
            <span>© 2026 TripBuddy Platform. All rights reserved.</span>
            <span>·</span>
            <span className="text-[#A3B8AD]">Curated for Indian Explorers</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#88A395]">Demo Mode: Local Persistence Active</span>
            <Link to="/guides" className="hover:text-white transition-colors">Travel Ethics</Link>
            <Link to="/explore" className="hover:text-white transition-colors">Destinations</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
