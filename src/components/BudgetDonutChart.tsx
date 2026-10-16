import React from 'react';
import { BudgetBreakdown } from '../types';

interface BudgetDonutChartProps {
  totalBudget: number;
  breakdown: BudgetBreakdown;
  travellersCount?: number;
}

const CATEGORY_CONFIG: { key: keyof BudgetBreakdown; label: string; color: string }[] = [
  { key: 'transportation', label: 'Transit & Flights', color: '#1D638B' }, // Ocean blue
  { key: 'accommodation', label: 'Stay & Hotels', color: '#1E4D3A' },     // Forest green
  { key: 'food', label: 'Food & Dining', color: '#D95328' },             // Sunset orange
  { key: 'activities', label: 'Activities & Sights', color: '#B45309' },  // Amber/Gold
  { key: 'localTransport', label: 'Local Cabs & Autos', color: '#0F766E' }, // Teal
  { key: 'miscellaneous', label: 'Buffer & Shopping', color: '#64748B' }   // Slate
];

export const BudgetDonutChart: React.FC<BudgetDonutChartProps> = ({
  totalBudget,
  breakdown,
  travellersCount = 1
}) => {
  const totalSpent = Object.values(breakdown).reduce((sum, val) => sum + (Number(val) || 0), 0);
  const remaining = totalBudget - totalSpent;
  const spentPercent = totalBudget > 0 ? Math.min(Math.round((totalSpent / totalBudget) * 100), 200) : 0;
  const perPersonCost = Math.round(totalSpent / Math.max(travellersCount, 1));

  // Calculate SVG stroke dashes for donut segments
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12
  let accumulatedPercent = 0;

  const segments = CATEGORY_CONFIG.map(cat => {
    const value = Number(breakdown[cat.key]) || 0;
    const percent = totalSpent > 0 ? value / totalSpent : 0;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -(accumulatedPercent * circumference);
    accumulatedPercent += percent;
    return {
      ...cat,
      value,
      percent: Math.round(percent * 100),
      strokeDasharray,
      strokeDashoffset
    };
  });

  const getStatusBadge = () => {
    if (totalSpent > totalBudget) {
      return {
        label: 'Over Budget',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        note: `Exceeds target by ₹${Math.abs(remaining).toLocaleString('en-IN')}`
      };
    }
    if (spentPercent >= 85) {
      return {
        label: 'Approaching Limit',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        note: `₹${remaining.toLocaleString('en-IN')} remaining`
      };
    }
    return {
      label: 'Within Budget',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      note: `₹${remaining.toLocaleString('en-IN')} remaining buffer`
    };
  };

  const status = getStatusBadge();

  return (
    <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#F0ECE4]">
        {/* SVG Donut */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#F0ECE4"
              strokeWidth="20"
            />
            {totalSpent > 0 && segments.map(seg => (
              <circle
                key={seg.key}
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth="20"
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-wider text-[#64748B] font-medium">Spent</span>
            <span className="text-xl font-bold text-[#1E2923] font-display tabular-nums">
              {spentPercent}%
            </span>
            <span className="text-[11px] text-[#64748B] tabular-nums">
              ₹{totalSpent.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Totals Summary */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#64748B]">Total Planned Cost</span>
              <p className="text-2xl font-bold text-[#1E2923] tabular-nums font-display">
                ₹{totalSpent.toLocaleString('en-IN')}
              </p>
            </div>
            <div className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${status.color}`}>
              {status.label}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[11px] text-[#64748B] block">Per Person ({travellersCount} {travellersCount === 1 ? 'traveller' : 'travellers'})</span>
              <span className="text-base font-bold text-[#1E4D3A] tabular-nums">
                ₹{perPersonCost.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[11px] text-[#64748B] block">Target Cap</span>
              <span className="text-base font-bold text-[#1E2923] tabular-nums">
                ₹{totalBudget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#64748B]">
            {status.note}
          </p>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="pt-5 space-y-3">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-[#64748B]">Category Allocation</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {segments.map(seg => (
            <div
              key={seg.key}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-3 h-3 rounded-xs shrink-0"
                  style={{ backgroundColor: seg.color }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-[#1E2923] truncate">{seg.label}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#1E2923] tabular-nums">
                  ₹{seg.value.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-[#64748B] ml-1.5 tabular-nums">({seg.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
