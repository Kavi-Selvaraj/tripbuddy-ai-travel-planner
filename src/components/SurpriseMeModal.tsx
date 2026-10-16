import React, { useState } from 'react';
import { Sparkles, X, Heart, ArrowRight, RefreshCw, Compass } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination, WeatherMood } from '../types';
import { useTravel } from '../context/TravelContext';
import { ImageWithFallback } from './ImageWithFallback';
import { useNavigate } from 'react-router-dom';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useTravel();

  const [budgetTier, setBudgetTier] = useState<number>(8000);
  const [days, setDays] = useState<number>(3);
  const [preferredMood, setPreferredMood] = useState<WeatherMood | 'Any'>('Any');
  const [region, setRegion] = useState<string>('All');

  const [result, setResult] = useState<Destination | null>(null);
  const [triedCount, setTriedCount] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [matchReason, setMatchReason] = useState<string>('');

  if (!isOpen) return null;

  const handleSurpriseMe = () => {
    setIsSpinning(true);
    setTimeout(() => {
      let filtered = DESTINATIONS.filter(d => {
        const matchesBudget = d.indicativeBudgetPerPerson <= budgetTier * 1.35;
        const matchesMood = preferredMood === 'Any' || d.idealWeatherMood === preferredMood;
        const matchesRegion = region === 'All' || d.region.includes(region);
        return matchesBudget && matchesMood && matchesRegion;
      });

      if (filtered.length === 0) {
        // Fallback: relax constraints gracefully
        filtered = DESTINATIONS.filter(d => region === 'All' || d.region.includes(region));
        if (filtered.length === 0) filtered = DESTINATIONS;
      }

      // Pick destination rotating to prevent repeat
      const selectedIndex = (triedCount + Math.floor(Math.random() * filtered.length)) % filtered.length;
      const picked = filtered[selectedIndex];
      
      setResult(picked);
      setTriedCount(prev => prev + 1);
      setIsSpinning(false);

      setMatchReason(
        `Curated for your ${days}-day window with an estimated budget of ₹${picked.indicativeBudgetPerPerson.toLocaleString('en-IN')}. Matches your desire for ${picked.idealWeatherMood.toLowerCase()} climates and ${picked.categories.slice(0, 2).join(' & ')}.`
      );
    }, 400);
  };

  const handleExplore = (id: string) => {
    onClose();
    navigate(`/destination/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#EAE5DC] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="surprise-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0ECE4]">
          <div className="flex items-center gap-2 text-[#1E4D3A]">
            <Sparkles className="w-5 h-5 text-[#D95328]" />
            <h3 id="surprise-title" className="text-lg font-bold font-display text-[#1E2923]">
              Surprise Me: Destination Matcher
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#1E2923] hover:bg-[#FAF8F5] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!result ? (
            <div className="space-y-5">
              <p className="text-xs text-[#64748B] leading-relaxed">
                Tell us your travel parameters and our discovery engine will pinpoint your ideal match.
              </p>

              {/* Budget slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#1E2923]">Approx. Budget per Person</span>
                  <span className="font-bold text-[#1E4D3A] tabular-nums">₹{budgetTier.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="18000"
                  step="1000"
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(Number(e.target.value))}
                  className="w-full accent-[#1E4D3A] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#64748B] mt-1">
                  <span>₹4,000 (Backpacker)</span>
                  <span>₹10,000 (Balanced)</span>
                  <span>₹18,000+ (Premium)</span>
                </div>
              </div>

              {/* Days & Mood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2923] mb-1.5">
                    Trip Duration
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:outline-hidden focus:border-[#1E4D3A]"
                  >
                    <option value={2}>2 Days (Weekend Break)</option>
                    <option value={3}>3 Days (Long Weekend)</option>
                    <option value={4}>4 Days (Relaxed Gateway)</option>
                    <option value={5}>5+ Days (Full Explorer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2923] mb-1.5">
                    Preferred Climate / Mood
                  </label>
                  <select
                    value={preferredMood}
                    onChange={(e) => setPreferredMood(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:outline-hidden focus:border-[#1E4D3A]"
                  >
                    <option value="Any">Any Mood / Open Mind</option>
                    <option value="Cool">Cool & Misty Highlands</option>
                    <option value="Pleasant">Pleasant Coastal & Lakes</option>
                    <option value="Sunny">Sunny Heritage & Deserts</option>
                    <option value="Mild">Lush Waterfalls & Valleys</option>
                  </select>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1.5">
                  Region Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['All', 'South India', 'North India', 'East & North-East India'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRegion(r)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors truncate ${
                        region === r
                          ? 'bg-[#1E4D3A] text-white border-[#1E4D3A]'
                          : 'bg-[#FAF8F5] text-[#1E2923] border-[#EAE5DC] hover:border-[#1E4D3A]'
                      }`}
                    >
                      {r === 'East & North-East India' ? 'East / NE' : r}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSurpriseMe}
                disabled={isSpinning}
                className="w-full py-3 px-4 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                {isSpinning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Searching Destinations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D95328]" />
                    <span>Spin & Find My Match</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-video border border-[#EAE5DC]">
                <ImageWithFallback
                  src={result.image}
                  alt={result.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleWishlist(result.id)}
                    className="p-2 rounded-full bg-white/90 hover:bg-white text-[#1E2923] transition-colors shadow-xs"
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted(result.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`}
                    />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-[11px] text-white/80 mb-0.5">
                    <span>{result.state}</span>
                    <span>·</span>
                    <span>{result.region}</span>
                    <span>·</span>
                    <span className="tabular-nums">★ {result.rating}</span>
                  </div>
                  <h4 className="text-xl font-bold font-display">{result.name}</h4>
                </div>
              </div>

              {/* Why it matches */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#1E4D3A] block mb-1">
                  Why TripBuddy Selected This:
                </span>
                <p className="text-xs text-[#1E2923] leading-relaxed">
                  {matchReason}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <span className="text-xs font-semibold text-[#1E2923] block mb-2">
                  Top Recommended Highlights:
                </span>
                <ul className="space-y-1.5 text-xs text-[#64748B]">
                  {result.topAttractions.slice(0, 3).map(att => (
                    <li key={att.name} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E4D3A] mt-1.5 shrink-0" />
                      <span><strong className="text-[#1E2923]">{att.name}</strong>: {att.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] border border-[#EAE5DC] hover:border-[#1E4D3A] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  <span>Try Another</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExplore(result.id)}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#1E4D3A] hover:bg-[#163A2C] rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
