import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Heart, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { HIDDEN_GEMS } from '../data/hiddenGems';
import { HiddenGem } from '../types';
import { useTravel } from '../context/TravelContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const HiddenGemsPage: React.FC = () => {
  const { wishlist, toggleWishlist, isWishlisted } = useTravel();

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [maxBudget, setMaxBudget] = useState<number>(10000);
  const [randomGem, setRandomGem] = useState<HiddenGem | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const filteredGems = HIDDEN_GEMS.filter(gem => {
    const matchesRegion = selectedRegion === 'All' || gem.region === selectedRegion;
    const matchesDiff = selectedDifficulty === 'All' || gem.difficulty === selectedDifficulty;
    const matchesBudget = gem.estimatedBudget <= maxBudget;
    return matchesRegion && matchesDiff && matchesBudget;
  });

  const handleRandomDiscovery = () => {
    setIsRolling(true);
    setTimeout(() => {
      const remaining = HIDDEN_GEMS.filter(g => !randomGem || g.id !== randomGem.id);
      const picked = remaining[Math.floor(Math.random() * remaining.length)];
      setRandomGem(picked);
      setIsRolling(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Breadcrumb & Marquee Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
              <span>/</span>
              <span className="text-[#1E2923] font-medium">Hidden Gems Explorer</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1E2923] tracking-tight">
              Find the Places Everyone Else Misses.
            </h1>
            <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
              Discover quieter escapes, local favourites, scenic routes, and unforgettable places off the beaten path across India.
            </p>
          </div>

          {/* Random Roll Button */}
          <button
            type="button"
            onClick={handleRandomDiscovery}
            disabled={isRolling}
            className="px-5 py-2.5 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Sparkles className={`w-4 h-4 text-[#D95328] ${isRolling ? 'animate-spin' : ''}`} />
            <span>Discover a Hidden Gem</span>
          </button>
        </div>

        {/* Random Gem Feature Spotlight if rolled */}
        {randomGem && (
          <div className="bg-[#142B21] text-white rounded-3xl p-6 sm:p-8 border border-[#27503F] shadow-lg animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#27503F] mb-6">
              <div className="flex items-center gap-2 text-[#52B788]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Spotlight Discovery Pick</span>
              </div>
              <button
                onClick={() => setRandomGem(null)}
                className="text-xs text-[#A3B8AD] hover:text-white"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black/40 border border-[#27503F]">
                <ImageWithFallback
                  src={randomGem.image}
                  fallbackSrc={randomGem.fallbackImage}
                  alt={randomGem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#A3B8AD]">
                  <span>{randomGem.location}, {randomGem.state}</span>
                  <span>·</span>
                  <span>{randomGem.suggestedDuration}</span>
                  <span>·</span>
                  <span className="text-[#52B788]">{randomGem.difficulty}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {randomGem.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#C2D4CA] leading-relaxed">
                  {randomGem.whyVisit}
                </p>

                <div className="p-3.5 rounded-xl bg-[#1C3A2D] border border-[#27503F] text-xs space-y-1">
                  <span className="font-bold text-[#52B788] block">Responsible Travel Guideline:</span>
                  <p className="text-[#A3B8AD]">{randomGem.responsibleTourismTips}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[11px] text-[#A3B8AD] block">Estimated Budget</span>
                    <span className="text-lg font-bold text-white tabular-nums">
                      ₹{randomGem.estimatedBudget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(randomGem.id)}
                    className="px-4 py-2 bg-[#27674E] hover:bg-[#328364] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted(randomGem.id) ? 'fill-rose-400 text-rose-400' : ''}`} />
                    <span>{isWishlisted(randomGem.id) ? 'Saved' : 'Save to Wishlist'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                Geographic Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
              >
                <option value="All">All Regions</option>
                <option value="North India">North India (Himalayan Valleys)</option>
                <option value="South India">South India (Western Ghats & Heritage)</option>
                <option value="East & North-East India">East & North-East India</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                Trail / Terrain Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
              >
                <option value="All">All Difficulty Levels</option>
                <option value="Easy">Easy (Motorable & Light Walks)</option>
                <option value="Moderate">Moderate (Stair Hikes & Rural Trails)</option>
                <option value="Adventurous">Adventurous (Remote & Trekking)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-[#1E2923]">Max Budget per Person</span>
                <span className="font-bold text-[#1E4D3A] tabular-nums">₹{maxBudget.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="10000"
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#1E4D3A] cursor-pointer mt-1"
              />
            </div>

          </div>
        </div>

        {/* Gems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGems.map(gem => (
            <div
              key={gem.id}
              className="bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Photo & Wishlist */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#EAE5DC]">
                <ImageWithFallback
                  src={gem.image}
                  fallbackSrc={gem.fallbackImage}
                  alt={`${gem.name}, ${gem.state}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => toggleWishlist(gem.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#1E2923] shadow-xs transition-colors z-10 cursor-pointer"
                  aria-label="Wishlist toggle"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted(gem.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`}
                  />
                </button>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                  {gem.suggestedDuration} · {gem.difficulty}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                    <span>{gem.location}</span>
                    <span>·</span>
                    <span>{gem.state}</span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-[#1E2923]">
                    {gem.name}
                  </h3>

                  <p className="text-xs text-[#64748B] mt-1 line-clamp-3 leading-relaxed">
                    {gem.whyVisit}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-3 pt-3 border-t border-[#F0ECE4] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E4D3A] block">
                      Experiences & Highlights:
                    </span>
                    <ul className="text-[11px] text-[#64748B] space-y-0.5">
                      {gem.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="truncate">• {h}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Ethical & Accessibility Note */}
                  <div className="mt-3 p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] text-[11px] text-[#64748B]">
                    <span className="font-semibold text-[#1E2923] block mb-0.5">Accessibility:</span>
                    <p className="line-clamp-2">{gem.accessibilityNotes}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#64748B] block">Est. Cost</span>
                    <span className="text-sm font-bold text-[#1E4D3A] tabular-nums">
                      ₹{gem.estimatedBudget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Link
                    to={`/planner?dest=coorg&budget=${gem.estimatedBudget}`}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#1E4D3A] hover:text-white border border-[#EAE5DC] rounded-xl transition-colors inline-flex items-center gap-1"
                  >
                    <span>Plan Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
