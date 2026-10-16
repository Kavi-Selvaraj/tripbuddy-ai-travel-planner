import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Bookmark, Compass, Calendar, Sparkles, MapPin } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { DESTINATIONS } from '../data/destinations';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, savedItineraries, deleteSavedItinerary, setActivePlan } = useTravel();

  const [activeTab, setActiveTab] = useState<'destinations' | 'itineraries'>('destinations');
  const [collectionFilter, setCollectionFilter] = useState<string>('All');

  const wishlistedDestinations = DESTINATIONS.filter(d => wishlist.includes(d.id));

  const filteredDestinations = wishlistedDestinations.filter(d => {
    if (collectionFilter === 'All') return true;
    return d.categories.some(c => c.toLowerCase().includes(collectionFilter.toLowerCase()));
  });

  const handleOpenItinerary = (plan: any) => {
    setActivePlan(plan);
    navigate('/planner');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
            <span>/</span>
            <span className="text-[#1E2923] font-medium">Saved Travel Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E2923] tracking-tight">
            Wishlist & Saved Itineraries
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            All your bookmarked dream places, customized multi-day itineraries, and group trip records in one unified place.
          </p>
        </div>

        {/* Top Segmented Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE5DC] pb-4">
          <div className="flex items-center gap-2 p-1 bg-[#F0ECE4] rounded-xl self-start text-xs font-semibold">
            <button
              onClick={() => setActiveTab('destinations')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'destinations'
                  ? 'bg-white text-[#1E2923] shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E2923]'
              }`}
            >
              Saved Destinations ({wishlist.length})
            </button>
            <button
              onClick={() => setActiveTab('itineraries')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'itineraries'
                  ? 'bg-white text-[#1E2923] shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E2923]'
              }`}
            >
              Saved Itineraries ({savedItineraries.length})
            </button>
          </div>

          {activeTab === 'destinations' && wishlistedDestinations.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#64748B] text-[11px] font-bold uppercase tracking-wider">Collection:</span>
              {['All', 'Mountains', 'Beaches', 'Historical'].map(col => (
                <button
                  key={col}
                  onClick={() => setCollectionFilter(col)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    collectionFilter === col
                      ? 'bg-[#1E4D3A] text-white'
                      : 'bg-white text-[#1E2923] border border-[#EAE5DC]'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: DESTINATIONS */}
        {activeTab === 'destinations' && (
          <div>
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map(dest => (
                  <div
                    key={dest.id}
                    className="group bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-[#EAE5DC]">
                      <ImageWithFallback
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => toggleWishlist(dest.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-rose-500 shadow-xs hover:bg-white transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px]">
                        {dest.suggestedDurationDays} Days · {dest.state}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                          <span>{dest.categories[0]}</span>
                          <span>·</span>
                          <span className="tabular-nums">★ {dest.rating}</span>
                        </div>
                        <h3 className="text-lg font-bold font-display text-[#1E2923]">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-[#64748B] line-clamp-2 mt-1">
                          {dest.shortDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#64748B] block">From Approx.</span>
                          <span className="text-xs font-bold text-[#1E4D3A] tabular-nums">
                            ₹{dest.indicativeBudgetPerPerson.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/planner?dest=${dest.id}`}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1E4D3A] rounded-xl hover:bg-[#163A2C] transition-colors"
                          >
                            Plan Trip
                          </Link>
                          <Link
                            to={`/destination/${dest.id}`}
                            className="px-3 py-1.5 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl hover:bg-[#F0ECE4] transition-colors"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#EAE5DC] rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
                <Heart className="w-10 h-10 text-rose-300 mx-auto" />
                <h3 className="text-base font-bold font-display text-[#1E2923]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#64748B]">
                  Browse through destinations across India and tap the heart icon to save places for your next adventure.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex px-4 py-2 bg-[#1E4D3A] text-white text-xs font-semibold rounded-xl"
                >
                  Explore Destinations
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED ITINERARIES */}
        {activeTab === 'itineraries' && (
          <div>
            {savedItineraries.length > 0 ? (
              <div className="space-y-4">
                {savedItineraries.map(itinerary => {
                  const dayCount = itinerary.days.length;
                  const totalEst = itinerary.days.reduce((s, d) => s + d.dayExpenseEstimate, 0);

                  return (
                    <div
                      key={itinerary.id}
                      className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <span>{itinerary.destinationName}</span>
                          <span>·</span>
                          <span>{itinerary.startingCity} Departure</span>
                          <span>·</span>
                          <span>{dayCount} Days</span>
                          <span>·</span>
                          <span>{itinerary.travelStyle}</span>
                        </div>

                        <h3 className="text-lg font-bold font-display text-[#1E2923]">
                          {itinerary.tripTitle}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-[#64748B] pt-1">
                          <span>Target: <strong className="text-[#1E2923] tabular-nums">₹{itinerary.totalBudget.toLocaleString('en-IN')}</strong></span>
                          <span>·</span>
                          <span>Estimated Spend: <strong className="text-[#1E4D3A] tabular-nums">₹{totalEst.toLocaleString('en-IN')}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenItinerary(itinerary)}
                          className="px-4 py-2 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Open in Planner</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteSavedItinerary(itinerary.id)}
                          className="p-2 text-[#64748B] hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete saved plan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-[#EAE5DC] rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
                <Bookmark className="w-10 h-10 text-[#64748B] mx-auto opacity-50" />
                <h3 className="text-base font-bold font-display text-[#1E2923]">No Itineraries Saved Yet</h3>
                <p className="text-xs text-[#64748B]">
                  Use the Trip Planner to create and save a personalized day-by-day plan.
                </p>
                <Link
                  to="/planner"
                  className="inline-flex px-4 py-2 bg-[#1E4D3A] text-white text-xs font-semibold rounded-xl"
                >
                  Open Trip Planner
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
