import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Users, RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { BudgetBreakdown } from '../types';
import { BudgetDonutChart } from '../components/BudgetDonutChart';

const PRESETS: {
  id: string;
  name: string;
  desc: string;
  totalBudget: number;
  breakdown: BudgetBreakdown;
  travellers: number;
}[] = [
  {
    id: 'backpacker',
    name: 'Backpacker Budget',
    desc: 'Sleeper trains, hostel dorms, local street stalls, and walking tours.',
    totalBudget: 6000,
    travellers: 1,
    breakdown: {
      transportation: 1200,
      accommodation: 1800,
      food: 1400,
      localTransport: 400,
      activities: 600,
      miscellaneous: 600
    }
  },
  {
    id: 'balanced',
    name: 'Balanced Explorer',
    desc: '3AC train / scenic driving, boutique homestay, cozy local restaurants, and guided trails.',
    totalBudget: 15000,
    travellers: 2,
    breakdown: {
      transportation: 3800,
      accommodation: 5200,
      food: 3000,
      localTransport: 1000,
      activities: 1200,
      miscellaneous: 800
    }
  },
  {
    id: 'heritage',
    name: 'Heritage & Comfort',
    desc: 'Flights, palace or plantation resort, private driver, fine dining, and heritage permits.',
    totalBudget: 35000,
    travellers: 2,
    breakdown: {
      transportation: 10500,
      accommodation: 14000,
      food: 5500,
      localTransport: 2500,
      activities: 1500,
      miscellaneous: 1000
    }
  },
  {
    id: 'weekend',
    name: 'Quick Weekend Break',
    desc: 'Self-drive rental or bus, 2 nights cozy stay, cafe hopping, and sunset viewpoints.',
    totalBudget: 9000,
    travellers: 2,
    breakdown: {
      transportation: 2500,
      accommodation: 3200,
      food: 1800,
      localTransport: 400,
      activities: 600,
      miscellaneous: 500
    }
  }
];

export const BudgetCalculatorPage: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(15000);
  const [travellers, setTravellers] = useState<number>(2);
  const [breakdown, setBreakdown] = useState<BudgetBreakdown>({
    transportation: 3800,
    accommodation: 5200,
    food: 3000,
    localTransport: 1000,
    activities: 1200,
    miscellaneous: 800
  });

  const handleCategoryChange = (key: keyof BudgetBreakdown, value: number) => {
    setBreakdown(prev => ({
      ...prev,
      [key]: Math.max(0, value)
    }));
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setTotalBudget(preset.totalBudget);
    setTravellers(preset.travellers);
    setBreakdown({ ...preset.breakdown });
  };

  const handleReset = () => {
    handleApplyPreset(PRESETS[1]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
            <span>/</span>
            <span className="text-[#1E2923] font-medium">Smart Travel Budget Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E2923] tracking-tight">
            Interactive Travel Expense Calculator
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Plan your travel finances with precision. Adjust individual categories, observe real-time spend percentages, and ensure zero surprise expenses.
          </p>
        </div>

        {/* Preset Profiles Bar */}
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#64748B] block mb-2">
            Load Preset Traveler Profile:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESETS.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="p-3.5 rounded-xl bg-white border border-[#EAE5DC] hover:border-[#1E4D3A] text-left transition-colors cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1E2923] group-hover:text-[#1E4D3A]">
                    {preset.name}
                  </h4>
                  <span className="text-[11px] font-bold text-[#1E4D3A] tabular-nums">
                    ₹{preset.totalBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                  {preset.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Calculator & Visualizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F0ECE4]">
              <div>
                <h3 className="text-lg font-bold font-display text-[#1E2923]">
                  Budget Inputs & Allocation
                </h3>
                <p className="text-xs text-[#64748B]">All figures formatted in Indian National Rupees (₹)</p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-[#64748B] hover:text-[#1E2923] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Values</span>
              </button>
            </div>

            {/* Target Budget & Travellers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1E2923] mb-1">
                  Target Trip Budget Cap (₹)
                </label>
                <input
                  type="number"
                  min="2000"
                  step="500"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-bold tabular-nums focus:outline-hidden focus:border-[#1E4D3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E2923] mb-1">
                  Number of Travellers
                </label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] font-semibold tabular-nums focus:outline-hidden focus:border-[#1E4D3A]"
                />
              </div>
            </div>

            {/* Category Sliders */}
            <div className="space-y-4 pt-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#64748B] block">
                Adjust Expense Categories:
              </span>

              {[
                { key: 'transportation', label: 'Transit & Flights (to/from destination)', max: 25000 },
                { key: 'accommodation', label: 'Accommodation (Homestays / Hotels / Resorts)', max: 30000 },
                { key: 'food', label: 'Food, Dining & Regional Specialties', max: 15000 },
                { key: 'localTransport', label: 'Local Transport (Autos, Taxis, Scooter Rental)', max: 8000 },
                { key: 'activities', label: 'Activities, Monument Tickets & Treks', max: 8000 },
                { key: 'miscellaneous', label: 'Buffer, Souvenirs & Shopping', max: 8000 }
              ].map(cat => {
                const currentVal = breakdown[cat.key as keyof BudgetBreakdown];
                return (
                  <div key={cat.key} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1E2923]">{cat.label}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[#64748B]">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={currentVal}
                          onChange={(e) => handleCategoryChange(cat.key as keyof BudgetBreakdown, Number(e.target.value))}
                          className="w-20 px-2 py-0.5 text-right font-bold text-[#1E2923] tabular-nums rounded border border-[#EAE5DC] bg-white text-xs"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={cat.max}
                      step="100"
                      value={currentVal}
                      onChange={(e) => handleCategoryChange(cat.key as keyof BudgetBreakdown, Number(e.target.value))}
                      className="w-full accent-[#1E4D3A] cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

          </div>

          {/* Visual Donut & Breakdown Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <BudgetDonutChart
              totalBudget={totalBudget}
              breakdown={breakdown}
              travellersCount={travellers}
            />

            {/* Next Steps CTA */}
            <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E4D3A]">
                Ready to Map This Budget to an Itinerary?
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Load your allocated budget directly into our multi-day trip planner to select matching attractions and homestays.
              </p>
              <Link
                to={`/planner?budget=${totalBudget}&travellers=${travellers}`}
                className="w-full py-2.5 px-4 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Transfer Budget to Trip Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
