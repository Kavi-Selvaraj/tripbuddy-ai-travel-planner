import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, ArrowRight, RotateCcw, Compass, MapPin } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { TravelCategory, Destination } from '../types';
import { useTravel } from '../context/TravelContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

const FILTER_CATEGORIES: TravelCategory[] = [
  'Beaches',
  'Mountains',
  'Nature',
  'Adventure',
  'Historical',
  'Romantic',
  'Weekend',
  'Family-friendly',
  'Budget',
  'Hidden gems'
];

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isWishlisted, toggleWishlist } = useTravel();

  const initialCategory = searchParams.get('category') as TravelCategory | null;
  const initialSearch = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'budget-asc' | 'budget-desc' | 'name-asc' | 'duration-asc'>('budget-asc');
  const [maxBudget, setMaxBudget] = useState<number>(15000);

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      // Search query filter (matches name, state, description, attractions)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        dest.name.toLowerCase().includes(q) ||
        dest.state.toLowerCase().includes(q) ||
        dest.shortDescription.toLowerCase().includes(q) ||
        dest.topAttractions.some(a => a.name.toLowerCase().includes(q));

      // Category filter
      const matchesCategory = selectedCategory === 'All' || dest.categories.includes(selectedCategory as TravelCategory);

      // Region filter
      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;

      // Budget filter
      const matchesBudget = dest.indicativeBudgetPerPerson <= maxBudget;

      return matchesSearch && matchesCategory && matchesRegion && matchesBudget;
    }).sort((a, b) => {
      if (sortBy === 'budget-asc') return a.indicativeBudgetPerPerson - b.indicativeBudgetPerPerson;
      if (sortBy === 'budget-desc') return b.indicativeBudgetPerPerson - a.indicativeBudgetPerPerson;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'duration-asc') return a.suggestedDurationDays - b.suggestedDurationDays;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedRegion, sortBy, maxBudget]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setMaxBudget(15000);
    setSortBy('budget-asc');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Page Title */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
            <span>/</span>
            <span className="text-[#1E2923] font-medium">Explore Destinations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E2923] tracking-tight">
            Discover Destinations Across India
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            From misty Western Ghat coffee estates to ancient boulder citadels and tranquil Arabian sea coves. Filter by travel mood, budget, and season.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination, state, or attraction..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] placeholder-[#64748B] focus:outline-hidden focus:border-[#1E4D3A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-[#1E2923]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Region Dropdown */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:outline-hidden focus:border-[#1E4D3A]"
              >
                <option value="All">All Regions of India</option>
                <option value="South India">South India</option>
                <option value="North India">North India</option>
                <option value="West India">West India</option>
                <option value="East & North-East India">East & North-East India</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:outline-hidden focus:border-[#1E4D3A]"
              >
                <option value="budget-asc">Price: Lowest to Highest</option>
                <option value="budget-desc">Price: Highest to Lowest</option>
                <option value="name-asc">Destination Name (A to Z)</option>
                <option value="duration-asc">Trip Duration (Shortest first)</option>
              </select>
            </div>

          </div>

          {/* Interactive Category Buttons (Allowed by constitution) */}
          <div className="pt-2 border-t border-[#F0ECE4]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-[#1E4D3A] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#1E2923] border border-[#EAE5DC] hover:border-[#1E4D3A]'
                }`}
              >
                All Experiences ({DESTINATIONS.length})
              </button>
              {FILTER_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1E4D3A] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#1E2923] border border-[#EAE5DC] hover:border-[#1E4D3A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Filter Slider & Results Counter */}
          <div className="pt-2 border-t border-[#F0ECE4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#64748B]">Max Budget:</span>
              <input
                type="range"
                min="4000"
                max="15000"
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-36 accent-[#1E4D3A] cursor-pointer"
              />
              <span className="font-bold text-[#1E4D3A] tabular-nums">
                ₹{maxBudget.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[#64748B]">
              <span className="font-medium text-[#1E2923] tabular-nums">
                Showing {filteredDestinations.length} of {DESTINATIONS.length} destinations
              </span>
              {(selectedCategory !== 'All' || selectedRegion !== 'All' || searchQuery || maxBudget < 15000) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#D95328] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo & Wishlist Action */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#EAE5DC]">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleWishlist(dest.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#1E2923] shadow-xs transition-colors z-10 cursor-pointer"
                    aria-label={isWishlisted(dest.id) ? `Remove ${dest.name} from wishlist` : `Add ${dest.name} to wishlist`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted(dest.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`}
                    />
                  </button>

                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                    {dest.suggestedDurationDays} Days · {dest.idealWeatherMood} Climate
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                      <span>{dest.state}</span>
                      <span>·</span>
                      <span>{dest.categories.slice(0, 2).join(' / ')}</span>
                      <span>·</span>
                      <span className="tabular-nums font-medium text-[#1E2923]">★ {dest.rating}</span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-[#1E2923] group-hover:text-[#1E4D3A] transition-colors">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-[#64748B] line-clamp-2 mt-1 leading-relaxed">
                      {dest.shortDescription}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#F0ECE4] text-[11px] text-[#64748B]">
                      <span className="font-medium text-[#1E2923]">Best Season: </span>
                      <span>{dest.bestSeason}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#64748B] block">From Approx.</span>
                      <span className="text-sm font-bold text-[#1E4D3A] tabular-nums">
                        ₹{dest.indicativeBudgetPerPerson.toLocaleString('en-IN')}
                        <span className="text-[11px] text-[#64748B] font-normal"> / person</span>
                      </span>
                    </div>

                    <Link
                      to={`/destination/${dest.id}`}
                      className="px-3.5 py-2 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#1E4D3A] hover:text-white border border-[#EAE5DC] rounded-xl transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-12 text-center space-y-4 max-w-md mx-auto">
            <Compass className="w-10 h-10 text-[#64748B] mx-auto opacity-50" />
            <h3 className="text-base font-bold font-display text-[#1E2923]">
              No Destinations Matched Your Filter
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Try broadening your budget limit or clearing specific region/category selections.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#1E4D3A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
