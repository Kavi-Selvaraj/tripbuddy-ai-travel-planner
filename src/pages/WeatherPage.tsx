import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  Wind, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Info, 
  AlertTriangle, 
  Luggage,
  Sparkles
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { WeatherMood } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WeatherPage: React.FC = () => {
  const [preferredMood, setPreferredMood] = useState<WeatherMood | 'All'>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('November');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const matchingDestinations = DESTINATIONS.filter(dest => {
    const matchesMood = preferredMood === 'All' || dest.idealWeatherMood === preferredMood;
    const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
    const matchesMonth = dest.weather.bestMonths.includes(selectedMonth);
    return matchesMood && matchesRegion && matchesMonth;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
            <span>/</span>
            <span className="text-[#1E2923] font-medium">Weather-Aware Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E2923] tracking-tight">
            Weather-Aware Destination Suggestions
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Never get stuck in torrential downpours or sweltering heat waves. Select your ideal climate and planned travel month to reveal optimal places.
          </p>
        </div>

        {/* Demo Mode & Intelligence Disclosure Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Verified Climate Intelligence (Demo Mode Active)</span>
            <p className="text-amber-800 leading-relaxed">
              These suggestions utilize verified historical and seasonal climatology records for Indian destinations. Live forecast integration can be connected via real API keys without altering the scheduling interface.
            </p>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Preferred Weather */}
            <div>
              <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                Preferred Climate & Atmosphere
              </label>
              <select
                value={preferredMood}
                onChange={(e) => setPreferredMood(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
              >
                <option value="All">All Weather Atmospheres</option>
                <option value="Cool">Cool & Misty Highlands (10°C - 24°C)</option>
                <option value="Pleasant">Pleasant & Breezy (18°C - 30°C)</option>
                <option value="Sunny">Sunny Heritage & Deserts (22°C - 32°C)</option>
                <option value="Mild">Mild Waterfalls & Valleys</option>
              </select>
            </div>

            {/* Month Picker */}
            <div>
              <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                Planned Travel Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
              >
                {MONTHS.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-bold text-[#1E2923] mb-1.5">
                Geographic Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
              >
                <option value="All">All Regions Across India</option>
                <option value="South India">South India</option>
                <option value="North India">North India</option>
                <option value="West India">West India</option>
                <option value="East & North-East India">East & North-East India</option>
              </select>
            </div>

          </div>

          <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-xs text-[#64748B]">
            <span>
              Showing <strong className="text-[#1E2923]">{matchingDestinations.length}</strong> matching destinations for <strong className="text-[#1E4D3A]">{selectedMonth}</strong>
            </span>
          </div>
        </div>

        {/* Results Cards */}
        {matchingDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingDestinations.map(dest => (
              <div
                key={dest.id}
                className="bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#EAE5DC]">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/95 text-[#1E2923] text-xs font-bold tabular-nums shadow-xs">
                    {dest.weather.avgTempMin}°C - {dest.weather.avgTempMax}°C
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                      <span>{dest.state}</span>
                      <span>·</span>
                      <span>Rain Risk: {dest.weather.rainfallChance}%</span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-[#1E2923]">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-[#1E4D3A] font-semibold mt-0.5">
                      {dest.weather.condition}
                    </p>

                    <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                      {dest.weather.climateSummary}
                    </p>

                    {/* Packing tips list */}
                    <div className="mt-3 pt-3 border-t border-[#F0ECE4] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1">
                        <Luggage className="w-3 h-3 text-[#1E4D3A]" />
                        <span>Packing Suggestions:</span>
                      </span>
                      <ul className="text-[11px] text-[#64748B] space-y-0.5">
                        {dest.weather.packingTips.slice(0, 2).map((tip, i) => (
                          <li key={i}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#64748B] block">From Approx.</span>
                      <span className="text-xs font-bold text-[#1E4D3A] tabular-nums">
                        ₹{dest.indicativeBudgetPerPerson.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link
                      to={`/destination/${dest.id}`}
                      className="px-3.5 py-1.5 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#1E4D3A] hover:text-white border border-[#EAE5DC] rounded-xl transition-colors inline-flex items-center gap-1"
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
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
            <CloudSun className="w-10 h-10 text-[#64748B] mx-auto opacity-50" />
            <h3 className="text-base font-bold font-display text-[#1E2923]">No Matches for Selected Month</h3>
            <p className="text-xs text-[#64748B]">
              Try selecting October, November, or December for optimal travel conditions across India.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
