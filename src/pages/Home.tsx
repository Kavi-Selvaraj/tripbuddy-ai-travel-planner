import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Sun, 
  CloudRain, 
  Wind, 
  ShieldCheck, 
  Check, 
  TrendingUp, 
  Share2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { DESTINATIONS, TRAVEL_MOODS } from '../data/destinations';
import { HIDDEN_GEMS } from '../data/hiddenGems';
import { TRAVEL_GUIDES } from '../data/guides';
import { useTravel } from '../context/TravelContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { SurpriseMeModal } from '../components/SurpriseMeModal';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, isWishlisted, userPreferences } = useTravel();

  // Quick planning hero form state
  const [startingCity, setStartingCity] = useState(userPreferences.homeCity || 'Bengaluru');
  const [selectedDestId, setSelectedDestId] = useState('coorg');
  const [daysCount, setDaysCount] = useState(3);
  const [travellers, setTravellers] = useState(2);
  const [budgetTier, setBudgetTier] = useState(12000);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  // Weather section quick mood tab
  const [activeWeatherMood, setActiveWeatherMood] = useState<'Cool' | 'Pleasant' | 'Sunny'>('Cool');

  const handleHeroExplore = () => {
    navigate(`/explore?dest=${selectedDestId}`);
  };

  const handleHeroPlan = () => {
    navigate(`/planner?dest=${selectedDestId}&days=${daysCount}&travellers=${travellers}&budget=${budgetTier}&origin=${encodeURIComponent(startingCity)}`);
  };

  const filteredWeatherDestinations = DESTINATIONS.filter(d => d.idealWeatherMood === activeWeatherMood).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* 1. HERO SECTION & TRAVEL SEARCH */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background visual asset */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/src/assets/images/hero_scenic_travel_1792168395100.jpg"
            alt="Scenic mountain valley in India with backpacker"
            className="w-full h-full object-cover object-center"
          />
          {/* Measured scrim for legibility without slop gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#142B21]/95 via-[#142B21]/60 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Kicker & Trust Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
            <span className="text-[#D95328]">★</span>
            <span>Intelligent Destination Discovery & Multi-Day Itineraries</span>
          </div>

          {/* Headline & Value Prop */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] text-balance">
              Your Next Adventure Starts Here.
            </h1>
            <p className="text-base sm:text-lg text-[#E0E7E3] font-normal leading-relaxed max-w-2xl mx-auto">
              Discover extraordinary places, plan unforgettable journeys, and make every trip your own. Less planning stress, more travel stories.
            </p>
          </div>

          {/* Search & Quick-Planning Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#EAE5DC] p-4 sm:p-6 shadow-2xl text-left max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              
              {/* Origin */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Starting City
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs">
                  <MapPin className="w-4 h-4 text-[#1E4D3A] shrink-0" />
                  <input
                    type="text"
                    value={startingCity}
                    onChange={(e) => setStartingCity(e.target.value)}
                    placeholder="Origin (e.g. Bengaluru)"
                    className="w-full bg-transparent text-[#1E2923] font-medium focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Destination
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs">
                  <Compass className="w-4 h-4 text-[#1E4D3A] shrink-0" />
                  <select
                    value={selectedDestId}
                    onChange={(e) => setSelectedDestId(e.target.value)}
                    className="w-full bg-transparent text-[#1E2923] font-medium focus:outline-hidden cursor-pointer"
                  >
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}, {d.state}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Trip Duration
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs">
                  <Calendar className="w-4 h-4 text-[#1E4D3A] shrink-0" />
                  <select
                    value={daysCount}
                    onChange={(e) => setDaysCount(Number(e.target.value))}
                    className="w-full bg-transparent text-[#1E2923] font-medium focus:outline-hidden cursor-pointer"
                  >
                    <option value={2}>2 Days (Weekend)</option>
                    <option value={3}>3 Days (Standard)</option>
                    <option value={4}>4 Days (Relaxed)</option>
                    <option value={5}>5 Days (Deep Tour)</option>
                  </select>
                </div>
              </div>

              {/* Travellers */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Travellers
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs">
                  <Users className="w-4 h-4 text-[#1E4D3A] shrink-0" />
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(Number(e.target.value))}
                    className="w-full bg-transparent text-[#1E2923] font-medium focus:outline-hidden cursor-pointer"
                  >
                    <option value={1}>1 Solo Nomad</option>
                    <option value={2}>2 Travellers</option>
                    <option value={4}>4 Friends Group</option>
                    <option value={6}>6+ Family / Group</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Total Budget
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs">
                  <Wallet className="w-4 h-4 text-[#1E4D3A] shrink-0" />
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(Number(e.target.value))}
                    className="w-full bg-transparent text-[#1E2923] font-medium focus:outline-hidden cursor-pointer"
                  >
                    <option value={6000}>₹6,000 (Backpacker)</option>
                    <option value={12000}>₹12,000 (Standard)</option>
                    <option value={20000}>₹20,000 (Comfort)</option>
                    <option value={35000}>₹35,000+ (Heritage)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* CTAs and Surprise Me row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#F0ECE4] mt-4">
              <button
                type="button"
                onClick={() => setIsSurpriseOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#F0ECE4] border border-[#EAE5DC] rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D95328]" />
                <span>Surprise Me With a Destination</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleHeroExplore}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-[#1E2923] bg-white border border-[#EAE5DC] hover:border-[#1E4D3A] rounded-xl transition-colors cursor-pointer"
                >
                  Explore Destinations
                </button>
                <button
                  type="button"
                  onClick={handleHeroPlan}
                  className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-semibold text-white bg-[#1E4D3A] hover:bg-[#163A2C] rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Build My Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Trust Highlights strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2 text-left">
            {[
              { title: 'Personalized Itineraries', desc: 'Custom daily pacing & timings' },
              { title: 'Transparent Budgets', desc: 'INR breakdowns & local costs' },
              { title: 'Hidden Gems Database', desc: 'Offbeat escapes beyond crowds' },
              { title: 'Group Trip Voting', desc: 'Democratic planning with friends' }
            ].map(item => (
              <div key={item.title} className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-white">
                <div className="flex items-center gap-1.5 text-xs font-bold font-display">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-[#C2D4CA] mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. TRENDING DESTINATIONS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block mb-1">
              Popular Circuits
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E2923]">
              Trending Destinations Across India
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold text-[#1E4D3A] hover:text-[#163A2C] flex items-center gap-1 group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.slice(0, 6).map((dest) => (
            <div
              key={dest.id}
              className="group bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image & Wishlist Button */}
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
                  {dest.suggestedDurationDays} Days Recommended
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                    <span>{dest.state}</span>
                    <span>·</span>
                    <span>{dest.categories[0]}</span>
                    <span>·</span>
                    <span className="tabular-nums font-medium text-[#1E2923]">★ {dest.rating}</span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-[#1E2923] group-hover:text-[#1E4D3A] transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-[#64748B] line-clamp-2 mt-1 leading-relaxed">
                    {dest.shortDescription}
                  </p>
                </div>

                {/* Footer Strip */}
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
      </section>

      {/* 3. EXPLORE BY TRAVEL MOOD */}
      <section className="py-16 bg-[#F5F2EC] border-y border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block mb-1">
              Tailored Vibes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E2923]">
              Explore by Travel Mood
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Find destinations calibrated precisely to what your soul and schedule need right now.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {TRAVEL_MOODS.map(mood => (
              <Link
                key={mood.id}
                to={`/explore?category=${mood.id}`}
                className="group relative rounded-xl overflow-hidden aspect-3/4 border border-[#EAE5DC] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <ImageWithFallback
                  src={mood.image}
                  alt={mood.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] text-white/80 block">{mood.count}</span>
                  <h3 className="text-sm font-bold font-display group-hover:text-[#F39C12] transition-colors">
                    {mood.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SMART TRIP PLANNER PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block">
              Multi-Day Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1E2923] tracking-tight leading-tight">
              Day-by-Day Itineraries Crafted Without the Planning Fatigue
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              No more messy spreadsheets or disjointed bookmark folders. TripBuddy generates day-by-day morning, afternoon, and evening schedules with realistic transit estimates, local culinary stops, and authentic experiences.
            </p>

            <div className="space-y-3">
              {[
                'Balanced pacing: Never rush between 8 sights in one day',
                'Transparent local budgets calculated in Indian Rupees (₹)',
                'Interactive drag, reorder, add, and remove activity controls',
                'One-click export to clipboard or clean printable travel summary'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1E2923]">
                  <div className="w-5 h-5 rounded-full bg-[#1E4D3A] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    ✓
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/planner"
                className="px-6 py-3 text-xs font-semibold text-white bg-[#1E4D3A] hover:bg-[#163A2C] rounded-xl flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>Launch Trip Planner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/budget"
                className="px-5 py-3 text-xs font-semibold text-[#1E2923] bg-white border border-[#EAE5DC] hover:border-[#1E4D3A] rounded-xl transition-colors"
              >
                Budget Calculator
              </Link>
            </div>
          </div>

          {/* Interactive Teaser Card */}
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
              <div>
                <span className="text-xs text-[#64748B]">Preview Sample</span>
                <h4 className="text-base font-bold font-display text-[#1E2923]">Day 1 in Coorg, Karnataka</h4>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#EAE5DC] text-[11px] font-semibold text-[#1E4D3A]">
                ₹2,400 Est. Cost
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1">
                  <span className="font-bold text-[#1E4D3A] uppercase tracking-wider">Morning · 8:30 AM</span>
                  <span>1.5 hrs</span>
                </div>
                <h5 className="text-xs font-bold text-[#1E2923]">Abbey Falls & Hanging Bridge Walk</h5>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Walk through private aromatic coffee plantations before the afternoon crowds arrive.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1">
                  <span className="font-bold text-[#D95328] uppercase tracking-wider">Afternoon · 1:00 PM</span>
                  <span>1 hr</span>
                </div>
                <h5 className="text-xs font-bold text-[#1E2923]">Authentic Lunch: Pandi Curry & Akki Roti</h5>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Traditional Kodava meal infused with dark kachampuli vinegar at Coorg Cuisine.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1">
                  <span className="font-bold text-[#1D638B] uppercase tracking-wider">Evening · 5:30 PM</span>
                  <span>2 hrs</span>
                </div>
                <h5 className="text-xs font-bold text-[#1E2923]">Raja’s Seat Sunset Viewpoint</h5>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Watch the mist roll into the deep valleys as the sun dips beneath the Western Ghats.
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#64748B] text-center pt-2">
              Every detail can be customized, edited, and shared with friends.
            </p>
          </div>

        </div>
      </section>

      {/* 5. WEATHER-AWARE DESTINATION SUGGESTIONS ("Where Should You Travel Next?") */}
      <section className="py-16 bg-[#FAF8F5] border-t border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block mb-1">
                Seasonal Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E2923]">
                Where Should You Travel Next?
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Curated weather recommendations matching current seasonal climate conditions across India.
              </p>
            </div>

            {/* Weather Mood Filter Tabs */}
            <div className="flex items-center p-1 bg-[#F0ECE4] rounded-xl self-start sm:self-auto">
              {(['Cool', 'Pleasant', 'Sunny'] as const).map(mood => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setActiveWeatherMood(mood)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeWeatherMood === mood
                      ? 'bg-white text-[#1E2923] shadow-xs'
                      : 'text-[#64748B] hover:text-[#1E2923]'
                  }`}
                >
                  {mood === 'Cool' ? '❄ Cool Mist' : mood === 'Pleasant' ? '🌤 Mild & Breezy' : '☀ Sunny Escapes'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredWeatherDestinations.map(dest => (
              <div
                key={dest.id}
                className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#1E4D3A]">{dest.state}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EAE5DC] text-[11px] font-semibold text-[#1E2923] tabular-nums">
                      {dest.weather.avgTempMin}°C - {dest.weather.avgTempMax}°C
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#1E2923]">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                    {dest.weather.condition}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                    Packing Advice:
                  </span>
                  <p className="text-xs text-[#1E2923]">
                    {dest.weather.packingTips[0]} & {dest.weather.packingTips[1]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4]">
                  <span className="text-xs text-[#64748B]">Best: {dest.weather.bestMonths.slice(0, 3).join(', ')}</span>
                  <Link
                    to={`/destination/${dest.id}`}
                    className="text-xs font-semibold text-[#1E4D3A] hover:underline flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/weather"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4D3A] hover:text-[#163A2C]"
            >
              <span>Explore All Weather Intelligence & Packing Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. HIDDEN GEMS EXPLORER PREVIEW ("Find the Places Everyone Else Misses") */}
      <section className="py-20 bg-[#142B21] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#52B788] block mb-1">
                Beyond the Crowds
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Find the Places Everyone Else Misses
              </h2>
              <p className="text-xs text-[#A3B8AD] mt-1">
                Discover quieter escapes, local favourites, scenic routes, and unforgettable places off the beaten path.
              </p>
            </div>
            <Link
              to="/hidden-gems"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#27674E] hover:bg-[#328364] rounded-xl transition-colors self-start sm:self-auto inline-flex items-center gap-1.5"
            >
              <span>Discover All Hidden Gems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIDDEN_GEMS.slice(0, 3).map(gem => (
              <div
                key={gem.id}
                className="bg-[#1C3A2D] border border-[#27503F] rounded-2xl overflow-hidden shadow-xs hover:border-[#52B788] transition-colors flex flex-col justify-between"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-black/40">
                  <ImageWithFallback
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white">
                    {gem.difficulty} Trail
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#A3B8AD] mb-1">
                      <span>{gem.state}</span>
                      <span>·</span>
                      <span>{gem.suggestedDuration}</span>
                    </div>
                    <h3 className="text-base font-bold font-display text-white">
                      {gem.name}
                    </h3>
                    <p className="text-xs text-[#C2D4CA] mt-1 line-clamp-2 leading-relaxed">
                      {gem.whyVisit}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#27503F] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#A3B8AD] block">Est. Budget</span>
                      <span className="text-xs font-bold text-[#52B788] tabular-nums">
                        ₹{gem.estimatedBudget.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <Link
                      to="/hidden-gems"
                      className="text-xs font-semibold text-white hover:text-[#52B788] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PLAN A TRIP WITH FRIENDS (Group Trips Preview) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block">
                Collaborative Group Travel
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1E2923] tracking-tight">
                Great Trips Are Better Together.
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Organizing a trip with 4 or 6 friends usually means endless WhatsApp arguments. TripBuddy simplifies group travel with democratic voting on destinations, a shared itinerary, and an automatic expense split calculator.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#EAE5DC]">
                  <h4 className="text-xs font-bold text-[#1E2923] mb-1">1. Vote on Activities</h4>
                  <p className="text-[11px] text-[#64748B]">Let everyone cast votes on treks, meals, and dates with duplicate prevention.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#EAE5DC]">
                  <h4 className="text-xs font-bold text-[#1E2923] mb-1">2. Split Costs Fairly</h4>
                  <p className="text-[11px] text-[#64748B]">Track who paid for SUV fuel, homestay deposit, and dinner without confusion.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/group-trips"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#1E4D3A] hover:bg-[#163A2C] rounded-xl transition-colors shadow-xs"
                >
                  <span>Explore Group Trips Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Voting Mockup */}
            <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
                <div>
                  <span className="text-[11px] text-[#64748B]">Active Group Trip</span>
                  <h4 className="text-sm font-bold text-[#1E2923]">Coorg Coffee Trails & Camping</h4>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#EAE5DC] text-xs font-bold font-mono text-[#1E4D3A]">
                  COORG-429
                </span>
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                  Live Member Votes:
                </span>
                {[
                  { name: 'Mandalpatti 4x4 Jeep Summit', votes: 3, total: 4 },
                  { name: 'Traditional Pandi Curry Feast', votes: 2, total: 4 },
                  { name: 'Estate Coffee Roasting Walk', votes: 2, total: 4 }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#1E2923]">
                      <span>{item.name}</span>
                      <span className="text-[#1E4D3A] tabular-nums">{item.votes} / {item.total} Votes</span>
                    </div>
                    <div className="w-full bg-[#EAE5DC] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#1E4D3A] h-full rounded-full transition-all"
                        style={{ width: `${(item.votes / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#EAF2ED] border border-[#C5DDD0] text-xs text-[#1E4D3A] flex items-center justify-between">
                <span>Shared Budget Target: ₹32,000</span>
                <span className="font-bold tabular-nums">₹8,000 / person</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. BUDGET-FRIENDLY WEEKEND ESCAPES */}
      <section className="py-16 bg-[#F5F2EC] border-y border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block mb-1">
              Short Breaks
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E2923]">
              Budget-Friendly Weekend Escapes
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Quick 2-day escapes under ₹6,000 per person designed for weekend departures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'Gokarna', state: 'Karnataka', cost: 5200, tag: 'Coastal Cliff Treks', destId: 'gokarna' },
              { name: 'Hampi', state: 'Karnataka', cost: 5800, tag: 'Ancient Boulder Ruins', destId: 'hampi' },
              { name: 'Pondicherry', state: 'Puducherry', cost: 6500, tag: 'French Quarter & Promenade', destId: 'pondicherry' },
              { name: 'Rishikesh', state: 'Uttarakhand', cost: 5900, tag: 'River Rafting & Foothills', destId: 'rishikesh' }
            ].map(item => (
              <div
                key={item.name}
                className="p-5 rounded-2xl bg-white border border-[#EAE5DC] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1E4D3A] transition-colors"
              >
                <div>
                  <span className="text-[11px] text-[#64748B] block">{item.state}</span>
                  <h3 className="text-base font-bold font-display text-[#1E2923] mt-0.5">{item.name}</h3>
                  <p className="text-xs text-[#64748B] mt-1">{item.tag}</p>
                </div>
                <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E4D3A] tabular-nums">
                    ₹{item.cost.toLocaleString('en-IN')}
                  </span>
                  <Link
                    to={`/destination/${item.destId}`}
                    className="text-xs font-semibold text-[#1E2923] hover:text-[#1E4D3A] inline-flex items-center gap-1"
                  >
                    <span>View Plan</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRAVEL INSPIRATION & PRACTICAL GUIDES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block mb-1">
              Field Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E2923]">
              Travel Inspiration & Practical Guides
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Tested advice from experienced travelers on budgeting, packing, safety, and responsible tourism.
            </p>
          </div>
          <Link
            to="/guides"
            className="text-xs font-semibold text-[#1E4D3A] hover:underline flex items-center gap-1"
          >
            <span>All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAVEL_GUIDES.map(guide => (
            <Link
              key={guide.id}
              to="/guides"
              className="group bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#EAE5DC]">
                <ImageWithFallback
                  src={guide.coverImage}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#64748B] mb-1">
                    <span>{guide.category}</span>
                    <span>·</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold font-display text-[#1E2923] group-hover:text-[#1E4D3A] transition-colors leading-snug">
                    {guide.title}
                  </h4>
                  <p className="text-xs text-[#64748B] line-clamp-2 mt-1">
                    {guide.summary}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#1E4D3A] inline-flex items-center gap-1 pt-2 border-t border-[#F0ECE4]">
                  Read Field Guide <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Surprise Me Modal */}
      <SurpriseMeModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
      />

    </div>
  );
};
