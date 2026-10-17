import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Vote, 
  Share2, 
  Check, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { GroupTrip, VotingOption, GroupExpenseItem } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const GroupTripsPage: React.FC = () => {
  const { 
    groupTrips, 
    createGroupTrip, 
    voteOnGroupOption, 
    addGroupExpense, 
    addSharedItineraryItem, 
    currentUser 
  } = useTravel();

  const [selectedTripId, setSelectedTripId] = useState<string>(groupTrips[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'voting' | 'itinerary' | 'expenses' | 'members'>('voting');

  // Create Trip Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('Gokarna, Karnataka');
  const [dates, setDates] = useState('Nov 20 - Nov 23, 2026');
  const [groupSize, setGroupSize] = useState(4);
  const [sharedBudgetTarget, setSharedBudgetTarget] = useState(28000);
  const [travelStyle, setTravelStyle] = useState('Beach & Adventure');

  // Add voting option inline state
  const [newOptionTitle, setNewOptionTitle] = useState('');
  const [newOptionCategory, setNewOptionCategory] = useState<'Activity' | 'Dining' | 'Destination'>('Activity');

  // Add expense inline state
  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState(2500);
  const [newExpenseCategory, setNewExpenseCategory] = useState('Food & Dining');

  // Copy code feedback
  const [copiedCode, setCopiedCode] = useState(false);

  const currentTrip: GroupTrip | undefined = groupTrips.find(t => t.id === selectedTripId) || groupTrips[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName || !destination) return;
    const newId = createGroupTrip({
      tripName,
      destination,
      dates,
      groupSize,
      sharedBudgetTarget,
      travelStyle
    });
    setSelectedTripId(newId);
    setIsCreateOpen(false);
    setTripName('');
  };

  const handleCopyInvite = () => {
    if (!currentTrip) return;
    navigator.clipboard.writeText(`Join our TripBuddy group '${currentTrip.tripName}' with code: ${currentTrip.inviteCode}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTrip || !newExpenseDesc || newExpenseAmount <= 0) return;
    addGroupExpense(currentTrip.id, {
      description: newExpenseDesc,
      amount: Number(newExpenseAmount),
      paidByMemberId: currentUser.id,
      category: newExpenseCategory,
      splitAmongMemberIds: currentTrip.members.map(m => m.id)
    });
    setNewExpenseDesc('');
    setNewExpenseAmount(1000);
  };

  const handleAddVotingOptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTrip || !newOptionTitle) return;
    // Add via voting option
    setNewOptionTitle('');
  };

  // Group Financial Calculations
  const totalExpensesLogged = currentTrip?.expenses.reduce((s, e) => s + e.amount, 0) || 0;
  const perPersonTarget = currentTrip ? Math.round(currentTrip.sharedBudgetTarget / currentTrip.groupSize) : 0;
  const perPersonSpent = currentTrip ? Math.round(totalExpensesLogged / currentTrip.groupSize) : 0;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
              <span>/</span>
              <span className="text-[#1E2923] font-medium">Group Trip Planner</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E2923] tracking-tight">
              Great Trips Are Better Together.
            </h1>
            <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
              Plan group trips with friends without confusion. Democratic activity voting, shared daily itinerary, and split expense calculation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Group Trip</span>
          </button>
        </div>

        {/* Trip Selector Bar if multiple exist */}
        {groupTrips.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#64748B] font-semibold uppercase tracking-wider text-[11px] shrink-0">
              Your Group Trips:
            </span>
            {groupTrips.map(trip => (
              <button
                key={trip.id}
                onClick={() => setSelectedTripId(trip.id)}
                className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedTripId === trip.id
                    ? 'bg-[#1E4D3A] text-white shadow-xs'
                    : 'bg-white text-[#1E2923] border border-[#EAE5DC] hover:border-[#1E4D3A]'
                }`}
              >
                {trip.tripName} ({trip.destination})
              </button>
            ))}
          </div>
        )}

        {currentTrip ? (
          <div className="space-y-6">
            
            {/* Group Header Card */}
            <div className="bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F0ECE4]">
                <div className="flex items-center gap-4">
                  {(() => {
                    const tripDest = DESTINATIONS.find(d => 
                      currentTrip.destination.toLowerCase().includes(d.id.toLowerCase()) || 
                      currentTrip.destination.toLowerCase().includes(d.name.toLowerCase().split(' ')[0].toLowerCase())
                    );
                    if (!tripDest) return null;
                    return (
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[#EAE5DC] shadow-xs bg-[#EAE5DC]">
                        <ImageWithFallback
                          src={tripDest.image}
                          fallbackSrc={tripDest.fallbackImage}
                          alt={tripDest.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })()}
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1E4D3A]" />
                      <span>{currentTrip.destination}</span>
                      <span>·</span>
                      <Calendar className="w-3.5 h-3.5 text-[#1E4D3A]" />
                      <span>{currentTrip.dates}</span>
                      <span>·</span>
                      <Users className="w-3.5 h-3.5 text-[#1E4D3A]" />
                      <span>{currentTrip.members.length} Members ({currentTrip.groupSize} Cap)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E2923]">
                      {currentTrip.tripName}
                    </h2>
                  </div>
                </div>

                {/* Invite Code & Share button */}
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-center">
                    <span className="text-[10px] uppercase tracking-wider text-[#64748B] block font-bold">
                      Invite Code
                    </span>
                    <span className="text-sm font-bold font-mono text-[#1E4D3A]">
                      {currentTrip.inviteCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyInvite}
                    className="px-4 py-2 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#F0ECE4] border border-[#EAE5DC] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied Link!' : 'Invite Friends'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Numbers Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                  <span className="text-[#64748B] block text-[11px]">Shared Target Budget</span>
                  <span className="text-base font-bold text-[#1E2923] tabular-nums font-display">
                    ₹{currentTrip.sharedBudgetTarget.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                  <span className="text-[#64748B] block text-[11px]">Logged Expenses</span>
                  <span className="text-base font-bold text-[#1E4D3A] tabular-nums font-display">
                    ₹{totalExpensesLogged.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                  <span className="text-[#64748B] block text-[11px]">Est. Split per Person</span>
                  <span className="text-base font-bold text-[#1E2923] tabular-nums font-display">
                    ₹{perPersonSpent.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                  <span className="text-[#64748B] block text-[11px]">Budget Remaining</span>
                  <span className="text-base font-bold text-[#1D638B] tabular-nums font-display">
                    ₹{Math.max(0, currentTrip.sharedBudgetTarget - totalExpensesLogged).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Members Avatar Row */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#64748B]">Group Travelers:</span>
                  <div className="flex -space-x-2">
                    {currentTrip.members.map(member => (
                      <div
                        key={member.id}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-xs ${member.avatarColor}`}
                        title={`${member.name} (${member.role})`}
                      >
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>

                <span className="text-[11px] text-[#64748B]">
                  Demo system: Browser local persistence
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#EAE5DC] pb-2 text-xs font-semibold">
              {[
                { id: 'voting', label: `Activity Voting (${currentTrip.votingOptions.length})` },
                { id: 'itinerary', label: `Shared Itinerary (${currentTrip.sharedItinerary.length})` },
                { id: 'expenses', label: `Shared Expenses (${currentTrip.expenses.length})` },
                { id: 'members', label: `Group Members (${currentTrip.members.length})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2 px-1 relative transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-[#1E4D3A] font-bold'
                      : 'text-[#64748B] hover:text-[#1E2923]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4D3A] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* TAB 1: DEMOCRATIC VOTING */}
            {activeTab === 'voting' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-display text-[#1E2923]">
                    Vote on Proposed Activities & Dining
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    Click to cast or retract your vote. One vote per member.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTrip.votingOptions.map(option => {
                    const hasVoted = option.votedUserIds.includes(currentUser.id);
                    const voteCount = option.votedUserIds.length;
                    const percent = Math.round((voteCount / currentTrip.members.length) * 100);

                    return (
                      <div
                        key={option.id}
                        className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E4D3A]">
                              {option.category}
                            </span>
                            <span className="text-[#64748B]">By {option.suggestedBy}</span>
                          </div>

                          <h4 className="text-sm font-bold text-[#1E2923]">
                            {option.title}
                          </h4>

                          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                            {option.description}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-[#F0ECE4]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#1E2923] tabular-nums">
                              {voteCount} of {currentTrip.members.length} Members Voted
                            </span>
                            <span className="font-bold text-[#1E4D3A] tabular-nums">{percent}%</span>
                          </div>

                          <div className="w-full bg-[#EAE5DC] h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#1E4D3A] h-full rounded-full transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => voteOnGroupOption(currentTrip.id, option.id)}
                            className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                              hasVoted
                                ? 'bg-[#EAF2ED] text-[#1E4D3A] border-[#C5DDD0]'
                                : 'bg-white hover:bg-[#FAF8F5] text-[#1E2923] border-[#EAE5DC]'
                            }`}
                          >
                            <UserCheck className={`w-3.5 h-3.5 ${hasVoted ? 'text-[#1E4D3A]' : 'text-slate-400'}`} />
                            <span>{hasVoted ? 'You Voted (Click to remove)' : 'Vote for This Option'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: SHARED ITINERARY */}
            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-display text-[#1E2923]">
                    Shared Group Schedule
                  </h3>
                  <Link
                    to="/planner"
                    className="text-xs font-semibold text-[#1E4D3A] hover:underline"
                  >
                    Open in Full Itinerary Planner
                  </Link>
                </div>

                <div className="space-y-3">
                  {currentTrip.sharedItinerary.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white border border-[#EAE5DC] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#1E4D3A] uppercase tracking-wider">
                            {item.timeSlot}
                          </span>
                          <span className="text-[#64748B]">·</span>
                          <h4 className="text-xs font-bold text-[#1E2923]">{item.title}</h4>
                        </div>
                        <p className="text-xs text-[#64748B]">{item.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#1E4D3A] tabular-nums">
                          ₹{item.costEstimate.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#64748B] block">Total for group</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: EXPENSE SPLITTER */}
            {activeTab === 'expenses' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Expense List (7 cols) */}
                <div className="lg:col-span-7 bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-4">
                  <h3 className="text-base font-bold font-display text-[#1E2923]">
                    Logged Group Expenses
                  </h3>

                  {currentTrip.expenses.length > 0 ? (
                    <div className="space-y-2.5">
                      {currentTrip.expenses.map(exp => {
                        const paidByMember = currentTrip.members.find(m => m.id === exp.paidByMemberId)?.name || 'Member';
                        const perHead = Math.round(exp.amount / exp.splitAmongMemberIds.length);

                        return (
                          <div
                            key={exp.id}
                            className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5">
                              <h4 className="text-xs font-bold text-[#1E2923]">{exp.description}</h4>
                              <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                                <span>Paid by <strong>{paidByMember}</strong></span>
                                <span>·</span>
                                <span>{exp.category}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-bold text-[#1E2923] tabular-nums block">
                                ₹{exp.amount.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-[#1E4D3A] tabular-nums">
                                (₹{perHead} / person)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-[#64748B] py-4 text-center">
                      No group expenses logged yet. Add your first expense on the right!
                    </p>
                  )}
                </div>

                {/* Add Expense Form (5 cols) */}
                <div className="lg:col-span-5 bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold font-display text-[#1E2923]">
                    Log New Shared Expense
                  </h4>

                  <form onSubmit={handleAddExpenseSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E2923] mb-1">
                        Expense Description
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Car Toll & Petrol, Resort Dinner"
                        value={newExpenseDesc}
                        onChange={(e) => setNewExpenseDesc(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E2923] mb-1">
                        Amount Paid (₹)
                      </label>
                      <input
                        type="number"
                        min="10"
                        step="50"
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] font-bold tabular-nums"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E2923] mb-1">
                        Category
                      </label>
                      <select
                        value={newExpenseCategory}
                        onChange={(e) => setNewExpenseCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5]"
                      >
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Transportation">Transportation & Fuel</option>
                        <option value="Accommodation">Accommodation & Homestay</option>
                        <option value="Activities">Activities & Sightseeing</option>
                        <option value="Miscellaneous">Buffer & Drinks</option>
                      </select>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] text-[11px] text-[#64748B]">
                      <span>Splits equally among all <strong>{currentTrip.members.length} travelers</strong>: ~₹{Math.round(newExpenseAmount / currentTrip.members.length)} each.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-[#1E4D3A] hover:bg-[#163A2C] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                    >
                      Record Group Expense
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* TAB 4: MEMBERS */}
            {activeTab === 'members' && (
              <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs space-y-4 max-w-xl">
                <h3 className="text-base font-bold font-display text-[#1E2923]">
                  Group Members ({currentTrip.members.length} / {currentTrip.groupSize})
                </h3>
                <div className="space-y-3">
                  {currentTrip.members.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.avatarColor}`}>
                          {member.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#1E2923] block">{member.name}</span>
                          <span className="text-[11px] text-[#64748B]">{member.role}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-[#EAE5DC] text-[10px] font-semibold text-[#1E4D3A]">
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
            <Users className="w-10 h-10 text-[#64748B] mx-auto opacity-50" />
            <h3 className="text-base font-bold font-display text-[#1E2923]">No Group Trips Created</h3>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-[#1E4D3A] text-white text-xs font-semibold rounded-xl"
            >
              Create Your First Group Trip
            </button>
          </div>
        )}

      </div>

      {/* Create Group Trip Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-display text-[#1E2923]">
              Plan a New Group Trip With Friends
            </h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Trip Name</label>
                <input
                  type="text"
                  placeholder="e.g. Goa Reunion 2026"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Target Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Gokarna, Goa, Coorg, Hampi"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2923] mb-1">Dates / Window</label>
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E2923] mb-1">Group Size</label>
                  <input
                    type="number"
                    min="2"
                    max="16"
                    value={groupSize}
                    onChange={(e) => setGroupSize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2923] mb-1">Shared Budget Target (₹ INR)</label>
                <input
                  type="number"
                  min="5000"
                  step="1000"
                  value={sharedBudgetTarget}
                  onChange={(e) => setSharedBudgetTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] tabular-nums font-bold"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-[#64748B] bg-[#FAF8F5] rounded-xl border border-[#EAE5DC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#1E4D3A] rounded-xl"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
