import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Clock, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Check, 
  Copy, 
  Bookmark, 
  Printer, 
  RefreshCw, 
  ChevronRight, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { TravelStyle, TripPlan, DayItinerary, ActivityItem } from '../types';
import { generateStructuredItinerary, formatItineraryForClipboard } from '../utils/itineraryGenerator';
import { useTravel } from '../context/TravelContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

const TRAVEL_STYLES: TravelStyle[] = [
  'Relaxation',
  'Adventure',
  'Nature',
  'Food & Culture',
  'Photography',
  'Backpacking',
  'Luxury',
  'Budget Travel'
];

export const TripPlanner: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { activePlan, setActivePlan, saveItinerary, userPreferences } = useTravel();

  // Step state: 1 = Form, 2 = Generated Itinerary
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Form State
  const initialDest = searchParams.get('dest') || 'coorg';
  const initialDays = Number(searchParams.get('days')) || 3;
  const initialBudget = Number(searchParams.get('budget')) || 15000;
  const initialOrigin = searchParams.get('origin') || userPreferences.homeCity || 'Bengaluru';
  const initialTravellers = Number(searchParams.get('travellers')) || 2;

  const [destinationId, setDestinationId] = useState(initialDest);
  const [startingCity, setStartingCity] = useState(initialOrigin);
  const [daysCount, setDaysCount] = useState(initialDays);
  const [travellersCount, setTravellersCount] = useState(initialTravellers);
  const [totalBudget, setTotalBudget] = useState(initialBudget);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(userPreferences.preferredStyle || 'Nature');
  const [preferredTransport, setPreferredTransport] = useState<'Flight' | 'Train' | 'Road / Self-Drive' | 'Bus'>('Road / Self-Drive');
  const [accommodationType, setAccommodationType] = useState<'Budget Hostels / Homestays' | 'Mid-range Hotels & Resorts' | 'Luxury Heritage Stays'>('Mid-range Hotels & Resorts');

  // Plan State
  const [plan, setPlan] = useState<TripPlan | null>(activePlan);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Activity Edit Modal/Inline State
  const [editingActivity, setEditingActivity] = useState<{ dayNum: number; act: ActivityItem } | null>(null);
  const [newActivityDay, setNewActivityDay] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCost, setNewCost] = useState(500);
  const [newSlot, setNewSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');

  // Synchronize when activePlan loads
  useEffect(() => {
    if (activePlan) {
      setPlan(activePlan);
      setCurrentStep(2);
    }
  }, [activePlan]);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const newPlan = generateStructuredItinerary(
        destinationId,
        startingCity,
        daysCount,
        totalBudget,
        travelStyle,
        preferredTransport,
        accommodationType
      );
      newPlan.travellersCount = travellersCount;
      setPlan(newPlan);
      setActivePlan(newPlan);
      setIsGenerating(false);
      setCurrentStep(2);
    }, 600);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const refreshedPlan = generateStructuredItinerary(
        destinationId,
        startingCity,
        daysCount,
        totalBudget,
        travelStyle,
        preferredTransport,
        accommodationType
      );
      refreshedPlan.travellersCount = travellersCount;
      setPlan(refreshedPlan);
      setActivePlan(refreshedPlan);
      setIsGenerating(false);
    }, 400);
  };

  const handleCopyItinerary = () => {
    if (!plan) return;
    const text = formatItineraryForClipboard(plan);
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const handleSavePlan = () => {
    if (!plan) return;
    saveItinerary(plan);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Activity Management Helpers
  const handleDeleteActivity = (dayNumber: number, slot: 'morning' | 'afternoon' | 'evening', actId: string) => {
    if (!plan) return;
    const updatedDays = plan.days.map(d => {
      if (d.dayNumber !== dayNumber) return d;
      const updatedSlot = d[slot].filter(a => a.id !== actId);
      const newDayExpense = 
        (slot === 'morning' ? updatedSlot : d.morning).reduce((s, a) => s + a.costEstimate, 0) +
        (slot === 'afternoon' ? updatedSlot : d.afternoon).reduce((s, a) => s + a.costEstimate, 0) +
        (slot === 'evening' ? updatedSlot : d.evening).reduce((s, a) => s + a.costEstimate, 0);

      return {
        ...d,
        [slot]: updatedSlot,
        dayExpenseEstimate: newDayExpense
      };
    });

    const updatedPlan = { ...plan, days: updatedDays };
    setPlan(updatedPlan);
    setActivePlan(updatedPlan);
  };

  const handleMoveActivity = (dayNumber: number, slot: 'morning' | 'afternoon' | 'evening', index: number, direction: 'up' | 'down') => {
    if (!plan) return;
    const targetDay = plan.days.find(d => d.dayNumber === dayNumber);
    if (!targetDay) return;
    const items = [...targetDay[slot]];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const temp = items[index];
    items[index] = items[newIndex];
    items[newIndex] = temp;

    const updatedDays = plan.days.map(d => d.dayNumber === dayNumber ? { ...d, [slot]: items } : d);
    const updatedPlan = { ...plan, days: updatedDays };
    setPlan(updatedPlan);
    setActivePlan(updatedPlan);
  };

  const handleSaveEditedActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !editingActivity) return;
    const { dayNum, act } = editingActivity;

    const updatedDays = plan.days.map(d => {
      if (d.dayNumber !== dayNum) return d;
      const slot = act.timeSlot.toLowerCase() as 'morning' | 'afternoon' | 'evening';
      const updatedList = d[slot].map(item => item.id === act.id ? act : item);
      return {
        ...d,
        [slot]: updatedList
      };
    });

    const updatedPlan = { ...plan, days: updatedDays };
    setPlan(updatedPlan);
    setActivePlan(updatedPlan);
    setEditingActivity(null);
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !newActivityDay || !newTitle) return;

    const newItem: ActivityItem = {
      id: `custom-act-${Date.now()}`,
      timeSlot: newSlot,
      title: newTitle,
      description: newDesc || 'Custom activity planned by traveler',
      costEstimate: Number(newCost) || 0
    };

    const slotKey = newSlot.toLowerCase() as 'morning' | 'afternoon' | 'evening';

    const updatedDays = plan.days.map(d => {
      if (d.dayNumber !== newActivityDay) return d;
      return {
        ...d,
        [slotKey]: [...d[slotKey], newItem],
        dayExpenseEstimate: d.dayExpenseEstimate + newItem.costEstimate
      };
    });

    const updatedPlan = { ...plan, days: updatedDays };
    setPlan(updatedPlan);
    setActivePlan(updatedPlan);
    setNewActivityDay(null);
    setNewTitle('');
    setNewDesc('');
    setNewCost(500);
  };

  const totalCalculatedCost = plan?.days.reduce((sum, d) => sum + d.dayExpenseEstimate, 0) || 0;
  const targetBudget = plan?.totalBudget || totalBudget;
  const isOverBudget = totalCalculatedCost > targetBudget;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
              <span>/</span>
              <span className="text-[#1E2923] font-medium">Trip Planner</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E2923] tracking-tight">
              Personalized Multi-Day Itinerary Engine
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Custom day-by-day morning, afternoon, and evening schedules with local budgets, travel times, and sights.
            </p>
          </div>

          {/* Mode Step Switch */}
          <div className="flex items-center gap-2 p-1 bg-[#F0ECE4] rounded-xl self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentStep === 1
                  ? 'bg-white text-[#1E2923] shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E2923]'
              }`}
            >
              1. Preferences
            </button>
            <button
              onClick={() => {
                if (plan) setCurrentStep(2);
              }}
              disabled={!plan}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentStep === 2
                  ? 'bg-white text-[#1E2923] shadow-xs'
                  : plan ? 'text-[#64748B] hover:text-[#1E2923]' : 'text-[#64748B]/40 cursor-not-allowed'
              }`}
            >
              2. Itinerary View
            </button>
          </div>
        </div>

        {/* STEP 1: PREFERENCES FORM */}
        {currentStep === 1 && (
          <div className="bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-10 shadow-xs max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="border-b border-[#F0ECE4] pb-5 mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-[#1E4D3A] block mb-1">
                Step 1 of 2
              </span>
              <h2 className="text-2xl font-bold font-display text-[#1E2923]">
                Customize Your Travel Parameters
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Specify your destination, pace, and comfort level. Our travel algorithm builds a realistic schedule.
              </p>
            </div>

            <form onSubmit={handleGeneratePlan} className="space-y-6">
              
              {/* Row 1: Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                    Starting City / Origin
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#1E4D3A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={startingCity}
                      onChange={(e) => setStartingCity(e.target.value)}
                      placeholder="e.g. Bengaluru, Mumbai, Chennai, Delhi"
                      className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-medium focus:outline-hidden focus:border-[#1E4D3A]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                    Destination in India
                  </label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-[#1E4D3A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={destinationId}
                      onChange={(e) => setDestinationId(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-medium focus:outline-hidden focus:border-[#1E4D3A] cursor-pointer"
                    >
                      {DESTINATIONS.map(d => (
                        <option key={d.id} value={d.id}>{d.name}, {d.state} ({d.categories[0]})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Duration, Travellers, Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                    Duration (Days)
                  </label>
                  <select
                    value={daysCount}
                    onChange={(e) => setDaysCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-medium focus:outline-hidden focus:border-[#1E4D3A]"
                  >
                    <option value={2}>2 Days (Quick Weekend)</option>
                    <option value={3}>3 Days (Long Weekend)</option>
                    <option value={4}>4 Days (Relaxed Getaway)</option>
                    <option value={5}>5 Days (Deep Exploration)</option>
                    <option value={6}>6 Days (Extended Discovery)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                    Number of Travellers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={travellersCount}
                    onChange={(e) => setTravellersCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-medium focus:outline-hidden focus:border-[#1E4D3A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                    Total Budget Target (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="3000"
                    step="500"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-bold tabular-nums focus:outline-hidden focus:border-[#1E4D3A]"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Travel Style & Transport */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                    Travel Style
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-medium focus:outline-hidden focus:border-[#1E4D3A]"
                  >
                    {TRAVEL_STYLES.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                    Preferred Transport
                  </label>
                  <select
                    value={preferredTransport}
                    onChange={(e) => setPreferredTransport(e.target.value as any)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-medium focus:outline-hidden focus:border-[#1E4D3A]"
                  >
                    <option value="Road / Self-Drive">Road / Self-Drive (Car / SUV)</option>
                    <option value="Train">Indian Railways (3AC / Sleeper)</option>
                    <option value="Flight">Flight + Local Cab</option>
                    <option value="Bus">State / Private Sleeper Bus</option>
                  </select>
                </div>
              </div>

              {/* Accommodation Preference */}
              <div>
                <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                  Accommodation Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Budget Hostels / Homestays',
                    'Mid-range Hotels & Resorts',
                    'Luxury Heritage Stays'
                  ].map(acc => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => setAccommodationType(acc as any)}
                      className={`p-3 text-xs font-medium rounded-xl border text-left transition-colors cursor-pointer ${
                        accommodationType === acc
                          ? 'bg-[#1E4D3A] text-white border-[#1E4D3A]'
                          : 'bg-[#FAF8F5] text-[#1E2923] border-[#EAE5DC] hover:border-[#1E4D3A]'
                      }`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transparent Engine Disclosure Notice */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-start gap-2.5 text-xs text-[#64748B]">
                <AlertCircle className="w-4 h-4 text-[#1E4D3A] shrink-0 mt-0.5" />
                <p>
                  <strong>Verified Engine Mode:</strong> Generated recommendations utilize verified destination databases, real opening seasons, and structured scheduling rules. Costs are indicative estimates formatted in Indian Rupees (₹).
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 px-6 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Day-by-Day Schedule...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#D95328]" />
                      <span>Generate My Personalized Itinerary</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 2: GENERATED ITINERARY VIEW & MANAGEMENT */}
        {currentStep === 2 && plan && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Top Itinerary Dashboard Header */}
            <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {(() => {
                  const planDest = DESTINATIONS.find(d => d.id === plan.destinationId);
                  if (!planDest) return null;
                  return (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[#EAE5DC] shadow-xs bg-[#EAE5DC]">
                      <ImageWithFallback
                        src={planDest.image}
                        fallbackSrc={planDest.fallbackImage}
                        alt={planDest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })()}
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                    <span>From {plan.startingCity}</span>
                    <span>·</span>
                    <span>{plan.daysCount} Days</span>
                    <span>·</span>
                    <span>{plan.travellersCount} {plan.travellersCount === 1 ? 'Traveller' : 'Travellers'}</span>
                    <span>·</span>
                    <span>{plan.travelStyle}</span>
                  </div>
                  <h2 className="text-2xl font-bold font-display text-[#1E2923]">
                    {plan.tripTitle}
                  </h2>
                  <div className="flex items-center gap-4 text-xs mt-2">
                    <span className="text-[#64748B]">Allocated Target: <strong className="text-[#1E2923] tabular-nums">₹{plan.totalBudget.toLocaleString('en-IN')}</strong></span>
                    <span>·</span>
                    <span className="text-[#64748B]">Estimated Total: <strong className={`tabular-nums ${isOverBudget ? 'text-rose-600' : 'text-[#1E4D3A]'}`}>₹{totalCalculatedCost.toLocaleString('en-IN')}</strong></span>
                    <span>·</span>
                    <span className="text-[#64748B]">Per Person: <strong className="text-[#1E2923] tabular-nums">₹{Math.round(totalCalculatedCost / plan.travellersCount).toLocaleString('en-IN')}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="px-3 py-2 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#F0ECE4] border border-[#EAE5DC] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Regenerate activities"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyItinerary}
                  className="px-3 py-2 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#F0ECE4] border border-[#EAE5DC] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy formatted text"
                >
                  {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSuccess ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSavePlan}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1E4D3A] hover:bg-[#163A2C] rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  {saveSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Bookmark className="w-3.5 h-3.5" />}
                  <span>{saveSuccess ? 'Saved!' : 'Save Plan'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 text-[#64748B] hover:text-[#1E2923] bg-[#FAF8F5] hover:bg-[#F0ECE4] border border-[#EAE5DC] rounded-xl transition-colors cursor-pointer"
                  title="Print clean itinerary"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Over-budget alert indicator if applicable */}
            {isOverBudget && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  The planned daily activities exceed your target budget by ₹{(totalCalculatedCost - targetBudget).toLocaleString('en-IN')}. You can remove or adjust activities below.
                </span>
              </div>
            )}

            {/* Day-by-Day Accordion / Cards List */}
            <div className="space-y-6">
              {plan.days.map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-5"
                >
                  {/* Day Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0ECE4]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#1E4D3A] text-white flex items-center justify-center text-xs font-bold">
                          D{day.dayNumber}
                        </span>
                        <h3 className="text-lg font-bold font-display text-[#1E2923]">
                          Day {day.dayNumber}: {day.theme}
                        </h3>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1 pl-9">
                        {day.dayTips}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-xs font-semibold text-[#1E4D3A] tabular-nums bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#EAE5DC]">
                        Day Cost: ₹{day.dayExpenseEstimate.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setNewActivityDay(day.dayNumber);
                          setNewSlot('Morning');
                        }}
                        className="text-xs font-semibold text-[#1E4D3A] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Activity</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Slots: Morning, Afternoon, Evening */}
                  <div className="space-y-4">
                    
                    {/* Morning */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4D3A] block">
                        Morning
                      </span>
                      <div className="space-y-2">
                        {day.morning.map((act, idx) => (
                          <ActivityCard
                            key={act.id}
                            act={act}
                            dayNum={day.dayNumber}
                            slot="morning"
                            index={idx}
                            totalCount={day.morning.length}
                            onMove={handleMoveActivity}
                            onDelete={handleDeleteActivity}
                            onEdit={(dayNum, act) => setEditingActivity({ dayNum, act })}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div className="space-y-2 pt-2 border-t border-[#F0ECE4]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#D95328] block">
                        Afternoon
                      </span>
                      <div className="space-y-2">
                        {day.afternoon.map((act, idx) => (
                          <ActivityCard
                            key={act.id}
                            act={act}
                            dayNum={day.dayNumber}
                            slot="afternoon"
                            index={idx}
                            totalCount={day.afternoon.length}
                            onMove={handleMoveActivity}
                            onDelete={handleDeleteActivity}
                            onEdit={(dayNum, act) => setEditingActivity({ dayNum, act })}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Evening */}
                    <div className="space-y-2 pt-2 border-t border-[#F0ECE4]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D638B] block">
                        Evening
                      </span>
                      <div className="space-y-2">
                        {day.evening.map((act, idx) => (
                          <ActivityCard
                            key={act.id}
                            act={act}
                            dayNum={day.dayNumber}
                            slot="evening"
                            index={idx}
                            totalCount={day.evening.length}
                            onMove={handleMoveActivity}
                            onDelete={handleDeleteActivity}
                            onEdit={(dayNum, act) => setEditingActivity({ dayNum, act })}
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Back to Edit Parameters */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-semibold text-[#64748B] hover:text-[#1E2923] underline"
              >
                Modify Trip Parameters & Re-plan
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Edit Activity Modal */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-display text-[#1E2923]">
              Edit Activity Description & Cost
            </h3>
            <form onSubmit={handleSaveEditedActivity} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Title</label>
                <input
                  type="text"
                  value={editingActivity.act.title}
                  onChange={(e) => setEditingActivity({
                    ...editingActivity,
                    act: { ...editingActivity.act, title: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingActivity.act.description}
                  onChange={(e) => setEditingActivity({
                    ...editingActivity,
                    act: { ...editingActivity.act, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Estimated Cost (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={editingActivity.act.costEstimate}
                  onChange={(e) => setEditingActivity({
                    ...editingActivity,
                    act: { ...editingActivity.act, costEstimate: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] tabular-nums"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingActivity(null)}
                  className="flex-1 py-2 text-xs font-semibold text-[#64748B] bg-[#FAF8F5] rounded-xl border border-[#EAE5DC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#1E4D3A] rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Activity Modal */}
      {newActivityDay !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-display text-[#1E2923]">
              Add Activity to Day {newActivityDay}
            </h3>
            <form onSubmit={handleCreateActivity} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Time Slot</label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Activity Title</label>
                <input
                  type="text"
                  placeholder="e.g. Visit Tibetan Flea Market"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Details, spot name, opening hours..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Estimated Cost (₹ INR)</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] tabular-nums"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewActivityDay(null)}
                  className="flex-1 py-2 text-xs font-semibold text-[#64748B] bg-[#FAF8F5] rounded-xl border border-[#EAE5DC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#1E4D3A] rounded-xl"
                >
                  Add to Day {newActivityDay}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

interface ActivityCardProps {
  act: ActivityItem;
  dayNum: number;
  slot: 'morning' | 'afternoon' | 'evening';
  index: number;
  totalCount: number;
  onMove: (dayNum: number, slot: 'morning' | 'afternoon' | 'evening', index: number, dir: 'up' | 'down') => void;
  onDelete: (dayNum: number, slot: 'morning' | 'afternoon' | 'evening', id: string) => void;
  onEdit: (dayNum: number, act: ActivityItem) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  act,
  dayNum,
  slot,
  index,
  totalCount,
  onMove,
  onDelete,
  onEdit
}) => {
  return (
    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] flex flex-col sm:flex-row sm:items-start justify-between gap-3 group">
      <div className="space-y-1 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-[#1E2923]">{act.title}</h4>
          {act.location && (
            <span className="text-[11px] text-[#64748B]">· {act.location}</span>
          )}
        </div>
        <p className="text-xs text-[#64748B] leading-relaxed">
          {act.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#64748B]">
          {act.travelTimeNote && <span>Transit: {act.travelTimeNote}</span>}
          {act.tips && <span>Tip: {act.tips}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
        <span className="text-xs font-bold text-[#1E4D3A] tabular-nums">
          ₹{act.costEstimate.toLocaleString('en-IN')}
        </span>

        {/* Reorder and Edit controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(dayNum, slot, index, 'up')}
            className="p-1 text-[#64748B] hover:text-[#1E2923] disabled:opacity-30 cursor-pointer"
            title="Move up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={index === totalCount - 1}
            onClick={() => onMove(dayNum, slot, index, 'down')}
            className="p-1 text-[#64748B] hover:text-[#1E2923] disabled:opacity-30 cursor-pointer"
            title="Move down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(dayNum, act)}
            className="p-1 text-[#64748B] hover:text-[#1E2923] cursor-pointer"
            title="Edit activity"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(dayNum, slot, act.id)}
            className="p-1 text-[#64748B] hover:text-rose-600 cursor-pointer"
            title="Delete activity"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
