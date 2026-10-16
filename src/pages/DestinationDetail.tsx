import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Wallet, 
  Navigation, 
  Utensils, 
  Compass, 
  Check, 
  ArrowRight, 
  Sparkles, 
  CloudSun, 
  Users, 
  Share2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { useTravel } from '../context/TravelContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist, createGroupTrip, userPreferences } = useTravel();

  const [activeTab, setActiveTab] = useState<'overview' | 'attractions' | 'food' | 'stay' | 'transport'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  const destination = DESTINATIONS.find(d => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-center">
        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-8 max-w-md space-y-4 shadow-sm">
          <Compass className="w-10 h-10 text-[#64748B] mx-auto" />
          <h2 className="text-xl font-bold font-display text-[#1E2923]">Destination Not Found</h2>
          <p className="text-xs text-[#64748B]">The requested destination profile could not be located.</p>
          <Link
            to="/explore"
            className="inline-flex px-4 py-2 bg-[#1E4D3A] text-white text-xs font-semibold rounded-xl"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const handlePlanTripHere = () => {
    navigate(`/planner?dest=${destination.id}&days=${destination.suggestedDurationDays}&origin=${encodeURIComponent(userPreferences.homeCity || 'Bengaluru')}`);
  };

  const handleAddToGroupTrip = () => {
    const tripId = createGroupTrip({
      tripName: `${destination.name} Explorer Group`,
      destination: destination.name,
      dates: 'Next Long Weekend',
      groupSize: 4,
      sharedBudgetTarget: destination.indicativeBudgetPerPerson * 4,
      travelStyle: destination.categories[0]
    });
    navigate('/group-trips');
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* 1. Large Cover Hero */}
      <section className="relative h-[420px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden bg-black/60">
        <ImageWithFallback
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Top Floating Controls */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 flex items-center justify-between text-white z-10">
          <Link
            to="/explore"
            className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-md text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>All Destinations</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareLink}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-colors cursor-pointer"
              title="Share destination"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(destination.id)}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-[#1E2923] shadow-md transition-colors cursor-pointer"
              aria-label="Wishlist toggle"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted(destination.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`}
              />
            </button>
          </div>
        </div>

        {/* Hero Bottom Title & Key Stats */}
        <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 max-w-5xl text-white">
          <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#52B788]" />
            <span>{destination.state}</span>
            <span>·</span>
            <span>{destination.region}</span>
            <span>·</span>
            <span className="tabular-nums font-bold">★ {destination.rating} ({destination.reviewCount} Reviews)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            {destination.name}
          </h1>

          <p className="text-xs sm:text-sm text-white/90 max-w-3xl mt-2 line-clamp-2 leading-relaxed">
            {destination.shortDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 mt-4 border-t border-white/20 text-xs">
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider">Suggested Stay</span>
              <span className="font-bold">{destination.suggestedDurationDays} Days / {destination.suggestedDurationDays - 1} Nights</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider">Indicative Budget</span>
              <span className="font-bold tabular-nums">From ₹{destination.indicativeBudgetPerPerson.toLocaleString('en-IN')} / person</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider">Best Time</span>
              <span className="font-bold">{destination.bestSeason.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider">Ideal Weather</span>
              <span className="font-bold">{destination.weather.condition}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Booking Card Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main 2-column info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F0ECE4] rounded-xl overflow-x-auto text-xs font-semibold">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'attractions', label: `Top Sights (${destination.topAttractions.length})` },
                { id: 'food', label: 'Food & Dining' },
                { id: 'stay', label: 'Where to Stay' },
                { id: 'transport', label: 'How to Reach' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-[#1E2923] shadow-xs'
                      : 'text-[#64748B] hover:text-[#1E2923]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-4">
                  <h2 className="text-xl font-bold font-display text-[#1E2923]">About {destination.name}</h2>
                  <p className="text-xs sm:text-sm text-[#1E2923]/80 leading-relaxed">
                    {destination.overview}
                  </p>

                  <div className="pt-4 border-t border-[#F0ECE4]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                      Key Highlights & Experiences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {destination.recommendedActivities.map((act, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#1E2923] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EAE5DC]">
                          <Check className="w-3.5 h-3.5 text-[#1E4D3A] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weather & Seasonal Climate Intelligence */}
                <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
                    <div className="flex items-center gap-2 text-[#1E4D3A]">
                      <CloudSun className="w-5 h-5 text-[#D95328]" />
                      <h3 className="text-base font-bold font-display text-[#1E2923]">
                        Seasonal Weather Intelligence
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#64748B] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#EAE5DC]">
                      Verified Climate Data
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                      <span className="text-[11px] text-[#64748B] block">Typical Temperature</span>
                      <span className="text-base font-bold text-[#1E2923] tabular-nums">
                        {destination.weather.avgTempMin}°C - {destination.weather.avgTempMax}°C
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                      <span className="text-[11px] text-[#64748B] block">Expected Conditions</span>
                      <span className="text-xs font-bold text-[#1E4D3A]">
                        {destination.weather.condition}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                      <span className="text-[11px] text-[#64748B] block">Rainfall Likelihood</span>
                      <span className="text-base font-bold text-[#1D638B] tabular-nums">
                        {destination.weather.rainfallChance}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {destination.weather.climateSummary}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-semibold text-[#1E2923] block mb-1.5">
                      Weather-Smart Packing Suggestions:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#64748B]">
                      {destination.weather.packingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E4D3A] shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Safety & Practical Tips */}
                <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-3">
                  <h3 className="text-base font-bold font-display text-[#1E2923] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#1E4D3A]" />
                    <span>Practical Travel & Safety Advice</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#1E2923]">
                    {destination.travelTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC]">
                        <span className="text-[#1E4D3A] font-bold shrink-0">0{idx + 1}.</span>
                        <span className="text-[#64748B]">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: ATTRACTIONS */}
            {activeTab === 'attractions' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-xl font-bold font-display text-[#1E2923]">
                  Top Sights & Attractions in {destination.name}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {destination.topAttractions.map(att => (
                    <div
                      key={att.name}
                      className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-xs space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-semibold text-[#1E4D3A] uppercase tracking-wider">
                            {att.category}
                          </span>
                          <h3 className="text-base font-bold text-[#1E2923] font-display">
                            {att.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <span className="bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EAE5DC]">
                            {att.suggestedDuration}
                          </span>
                          {att.entryFee && (
                            <span className="bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EAE5DC] font-medium text-[#1E2923]">
                              {att.entryFee}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {att.description}
                      </p>
                      <div className="pt-2 text-[11px] text-[#1E4D3A] font-medium">
                        Best visiting time: {att.bestTimeOfDay}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FOOD */}
            {activeTab === 'food' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-xl font-bold font-display text-[#1E2923]">
                  Local Food & Cultural Specialties
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.localFoods.map(food => (
                    <div
                      key={food.name}
                      className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold font-display text-[#1E2923]">
                          {food.name}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${food.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {food.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {food.description}
                      </p>
                      {food.mustTrySpot && (
                        <div className="pt-2 text-xs text-[#1E4D3A] font-semibold flex items-center gap-1">
                          <Utensils className="w-3.5 h-3.5" />
                          <span>Must Try At: {food.mustTrySpot}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STAY */}
            {activeTab === 'stay' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-xl font-bold font-display text-[#1E2923]">
                  Suggested Accommodation Areas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.suggestedAccommodationAreas.map(area => (
                    <div
                      key={area.name}
                      className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold font-display text-[#1E2923]">
                          {area.name}
                        </h3>
                        <span className="text-xs font-semibold text-[#1E4D3A] tabular-nums">
                          {area.priceRange}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#64748B] block font-medium">
                        Vibe: {area.vibe}
                      </span>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: TRANSPORT */}
            {activeTab === 'transport' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h2 className="text-xl font-bold font-display text-[#1E2923]">
                  How to Reach {destination.name}
                </h2>
                <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="space-y-3 text-xs text-[#1E2923]">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4D3A] block mb-1">
                        By Air (Nearest Airport)
                      </span>
                      <p className="text-[#64748B]">{destination.transportGuidance.nearestAirport}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4D3A] block mb-1">
                        By Rail (Nearest Railway Station)
                      </span>
                      <p className="text-[#64748B]">{destination.transportGuidance.nearestRailway}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4D3A] block mb-1">
                        By Road & Self-Drive Access
                      </span>
                      <p className="text-[#64748B]">{destination.transportGuidance.roadAccess}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Nearby Destinations */}
            <div className="pt-4 border-t border-[#EAE5DC]">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-3">
                Combine with Nearby Destinations:
              </span>
              <div className="flex flex-wrap gap-2">
                {destination.nearbyDestinations.map(near => (
                  <span
                    key={near}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#EAE5DC] text-xs font-medium text-[#1E2923]"
                  >
                    {near}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Planning Sidebar Card */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <span className="text-xs text-[#64748B] block">TripBuddy Planning Engine</span>
                <h3 className="text-xl font-bold font-display text-[#1E2923] mt-0.5">
                  Ready to Experience {destination.name}?
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Generate a full day-by-day morning, afternoon, and evening schedule customized to your budget.
                </p>
              </div>

              {/* Indicative Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4D3A] block">
                  Indicative Cost Breakdown (3 Days):
                </span>
                <div className="flex justify-between text-[#64748B]">
                  <span>Stay & Homestays:</span>
                  <span className="font-semibold text-[#1E2923] tabular-nums">~₹3,500</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Food & Regional Dining:</span>
                  <span className="font-semibold text-[#1E2923] tabular-nums">~₹2,200</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Local Transit & Sightseeing:</span>
                  <span className="font-semibold text-[#1E2923] tabular-nums">~₹1,800</span>
                </div>
                <div className="pt-2 border-t border-[#EAE5DC] flex justify-between font-bold text-[#1E4D3A]">
                  <span>Est. Total Per Person:</span>
                  <span className="tabular-nums">₹{destination.indicativeBudgetPerPerson.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handlePlanTripHere}
                  className="w-full py-3 px-4 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D95328]" />
                  <span>Plan a Personalized Trip Here</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToGroupTrip}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#FAF8F5] text-[#1E2923] border border-[#EAE5DC] hover:border-[#1E4D3A] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#1D638B]" />
                  <span>Start a Group Trip with Friends</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(destination.id)}
                  className="w-full py-2 px-4 text-xs font-semibold text-[#64748B] hover:text-[#1E2923] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(destination.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isWishlisted(destination.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {copiedLink && (
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] text-center">
                  ✓ Link copied to clipboard!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
