import React, { useState } from 'react';
import { X, User, Check, Sliders } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { TravelStyle } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { userPreferences, updateUserPreferences, wishlist, savedItineraries, groupTrips } = useTravel();
  
  const [name, setName] = useState(userPreferences.name);
  const [homeCity, setHomeCity] = useState(userPreferences.homeCity);
  const [preferredStyle, setPreferredStyle] = useState<TravelStyle>(userPreferences.preferredStyle);
  const [typicalBudgetMax, setTypicalBudgetMax] = useState(userPreferences.typicalBudgetMax);
  const [dietaryPreference, setDietaryPreference] = useState(userPreferences.dietaryPreference);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPreferences({
      name,
      homeCity,
      preferredStyle,
      typicalBudgetMax,
      dietaryPreference
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl border border-[#EAE5DC] shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0ECE4]">
          <div className="flex items-center gap-2 text-[#1E4D3A]">
            <User className="w-5 h-5 text-[#1E4D3A]" />
            <h3 id="profile-title" className="text-base font-bold font-display text-[#1E2923]">
              Traveler Profile & Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#1E2923] hover:bg-[#FAF8F5] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-3 gap-2 px-6 py-3 bg-[#FAF8F5] border-b border-[#F0ECE4] text-center">
          <div>
            <span className="text-xs text-[#64748B] block">Saved Places</span>
            <span className="text-sm font-bold text-[#1E2923] tabular-nums">{wishlist.length}</span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">My Plans</span>
            <span className="text-sm font-bold text-[#1E2923] tabular-nums">{savedItineraries.length}</span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Group Trips</span>
            <span className="text-sm font-bold text-[#1E2923] tabular-nums">{groupTrips.length}</span>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1E2923] mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2923] mb-1">
              Starting / Home City
            </label>
            <input
              type="text"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              placeholder="e.g. Bengaluru, Mumbai, Delhi"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2923] mb-1">
              Favorite Travel Style
            </label>
            <select
              value={preferredStyle}
              onChange={(e) => setPreferredStyle(e.target.value as TravelStyle)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] text-[#1E2923] focus:border-[#1E4D3A] focus:outline-hidden"
            >
              {TRAVEL_STYLES.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#1E2923]">Target Budget Per Trip</span>
              <span className="font-bold text-[#1E4D3A] tabular-nums">₹{typicalBudgetMax.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="30000"
              step="1000"
              value={typicalBudgetMax}
              onChange={(e) => setTypicalBudgetMax(Number(e.target.value))}
              className="w-full accent-[#1E4D3A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2923] mb-1">
              Dietary Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['All', 'Vegetarian', 'Vegan'] as const).map(diet => (
                <button
                  type="button"
                  key={diet}
                  onClick={() => setDietaryPreference(diet)}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors ${
                    dietaryPreference === diet
                      ? 'bg-[#1E4D3A] text-white border-[#1E4D3A]'
                      : 'bg-[#FAF8F5] text-[#1E2923] border-[#EAE5DC]'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Preferences Saved!</span>
                </>
              ) : (
                <span>Save Profile Preferences</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
