import React, { createContext, useContext, useState, useEffect } from 'react';
import { TripPlan, GroupTrip, UserPreferences, GroupMember, VotingOption, GroupExpenseItem, ActivityItem } from '../types';
import { generateStructuredItinerary } from '../utils/itineraryGenerator';

interface TravelContextType {
  wishlist: string[];
  toggleWishlist: (destId: string) => void;
  isWishlisted: (destId: string) => boolean;
  savedItineraries: TripPlan[];
  saveItinerary: (plan: TripPlan) => void;
  deleteSavedItinerary: (planId: string) => void;
  activePlan: TripPlan | null;
  setActivePlan: (plan: TripPlan | null) => void;
  groupTrips: GroupTrip[];
  createGroupTrip: (data: {
    tripName: string;
    destination: string;
    dates: string;
    groupSize: number;
    sharedBudgetTarget: number;
    travelStyle: string;
  }) => string;
  voteOnGroupOption: (tripId: string, optionId: string) => void;
  addGroupExpense: (tripId: string, expense: { description: string; amount: number; paidByMemberId: string; category: string; splitAmongMemberIds: string[] }) => void;
  addSharedItineraryItem: (tripId: string, item: { timeSlot: 'Morning' | 'Afternoon' | 'Evening'; title: string; description: string; costEstimate: number; location?: string }) => void;
  userPreferences: UserPreferences;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void;
  currentUser: { id: string; name: string };
}

const DEFAULT_PREFERENCES: UserPreferences = {
  name: 'Aarav Mehta',
  homeCity: 'Bengaluru',
  preferredStyle: 'Nature',
  typicalBudgetMin: 5000,
  typicalBudgetMax: 15000,
  dietaryPreference: 'All'
};

const SEED_GROUP_TRIPS: GroupTrip[] = [
  {
    id: 'grp-coorg-friends',
    inviteCode: 'COORG-429',
    tripName: 'Coorg Coffee Trails & Camping',
    destination: 'Coorg (Kodagu)',
    destinationId: 'coorg',
    dates: 'Nov 14 - Nov 17, 2026',
    groupSize: 4,
    sharedBudgetTarget: 32000,
    travelStyle: 'Nature & Relaxation',
    createdAt: '2026-10-10T10:00:00Z',
    members: [
      { id: 'usr-1', name: 'Aarav (You)', avatarColor: 'bg-emerald-700 text-white', role: 'Leader', status: 'Ready' },
      { id: 'usr-2', name: 'Pooja R.', avatarColor: 'bg-amber-600 text-white', role: 'Member', status: 'Ready' },
      { id: 'usr-3', name: 'Rohan K.', avatarColor: 'bg-sky-700 text-white', role: 'Member', status: 'Voted' },
      { id: 'usr-4', name: 'Sneha M.', avatarColor: 'bg-rose-600 text-white', role: 'Member', status: 'Planning' }
    ],
    votingOptions: [
      {
        id: 'vote-1',
        category: 'Activity',
        title: 'Mandalpatti 4x4 Off-Road Jeep Summit',
        description: 'Sunrise drive to peak through mountain trails',
        votedUserIds: ['usr-1', 'usr-2', 'usr-3'],
        suggestedBy: 'Pooja R.'
      },
      {
        id: 'vote-2',
        category: 'Dining',
        title: 'Traditional Pandi Curry & Akki Roti Feast',
        description: 'Authentic Kodava family meal in Madikeri',
        votedUserIds: ['usr-1', 'usr-3'],
        suggestedBy: 'Rohan K.'
      },
      {
        id: 'vote-3',
        category: 'Activity',
        title: 'Coffee Roasting Workshop at Estate',
        description: 'Learn bean sorting, roasting, and sensory cupping',
        votedUserIds: ['usr-2', 'usr-4'],
        suggestedBy: 'Aarav (You)'
      }
    ],
    sharedItinerary: [
      {
        id: 'grp-act-1',
        timeSlot: 'Morning',
        title: 'Road Trip Start from Bangalore & Breakfast',
        description: 'Meet at NICE road junction; stop at Kunigal for hot thatte idlis.',
        costEstimate: 2400,
        location: 'Highway NH75'
      },
      {
        id: 'grp-act-2',
        timeSlot: 'Afternoon',
        title: 'Plantation Homestay Check-in & Estate Tour',
        description: 'Unpack in rustic wooden cottages surrounded by pepper vines.',
        costEstimate: 8000,
        location: 'Pollibetta'
      },
      {
        id: 'grp-act-3',
        timeSlot: 'Evening',
        title: 'Campfire & Kodava Barbecue',
        description: 'Acoustic songs, stargazing, and spicy regional grill.',
        costEstimate: 3500,
        location: 'Homestay Lawn'
      }
    ],
    expenses: [
      {
        id: 'exp-1',
        description: 'Self-Drive SUV Rental & Fuel',
        amount: 8600,
        paidByMemberId: 'usr-1',
        category: 'Transportation',
        splitAmongMemberIds: ['usr-1', 'usr-2', 'usr-3', 'usr-4']
      },
      {
        id: 'exp-2',
        description: 'Homestay 2-Night Advance Deposit',
        amount: 14000,
        paidByMemberId: 'usr-2',
        category: 'Accommodation',
        splitAmongMemberIds: ['usr-1', 'usr-2', 'usr-3', 'usr-4']
      },
      {
        id: 'exp-3',
        description: 'Day 1 Highway Dhaba & Snacks',
        amount: 1850,
        paidByMemberId: 'usr-3',
        category: 'Food',
        splitAmongMemberIds: ['usr-1', 'usr-2', 'usr-3', 'usr-4']
      }
    ]
  }
];

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tripbuddy_wishlist');
      return saved ? JSON.parse(saved) : ['coorg', 'hampi', 'goa'];
    } catch {
      return ['coorg', 'hampi', 'goa'];
    }
  });

  const [savedItineraries, setSavedItineraries] = useState<TripPlan[]>(() => {
    try {
      const saved = localStorage.getItem('tripbuddy_saved_itineraries');
      if (saved) return JSON.parse(saved);
      // seed initial itinerary
      const seedPlan = generateStructuredItinerary('coorg', 'Bengaluru', 3, 18000, 'Nature', 'Road / Self-Drive', 'Mid-range Hotels & Resorts');
      return [seedPlan];
    } catch {
      return [];
    }
  });

  const [activePlan, setActivePlan] = useState<TripPlan | null>(() => {
    try {
      const saved = localStorage.getItem('tripbuddy_active_plan');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [groupTrips, setGroupTrips] = useState<GroupTrip[]>(() => {
    try {
      const saved = localStorage.getItem('tripbuddy_group_trips');
      return saved ? JSON.parse(saved) : SEED_GROUP_TRIPS;
    } catch {
      return SEED_GROUP_TRIPS;
    }
  });

  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('tripbuddy_user_prefs');
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const currentUser = { id: 'usr-1', name: 'Aarav (You)' };

  useEffect(() => {
    localStorage.setItem('tripbuddy_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tripbuddy_saved_itineraries', JSON.stringify(savedItineraries));
  }, [savedItineraries]);

  useEffect(() => {
    if (activePlan) {
      localStorage.setItem('tripbuddy_active_plan', JSON.stringify(activePlan));
    }
  }, [activePlan]);

  useEffect(() => {
    localStorage.setItem('tripbuddy_group_trips', JSON.stringify(groupTrips));
  }, [groupTrips]);

  useEffect(() => {
    localStorage.setItem('tripbuddy_user_prefs', JSON.stringify(userPreferences));
  }, [userPreferences]);

  const toggleWishlist = (destId: string) => {
    setWishlist(prev => 
      prev.includes(destId) ? prev.filter(id => id !== destId) : [...prev, destId]
    );
  };

  const isWishlisted = (destId: string) => wishlist.includes(destId);

  const saveItinerary = (plan: TripPlan) => {
    setSavedItineraries(prev => {
      const exists = prev.some(p => p.id === plan.id);
      if (exists) {
        return prev.map(p => p.id === plan.id ? plan : p);
      }
      return [plan, ...prev];
    });
  };

  const deleteSavedItinerary = (planId: string) => {
    setSavedItineraries(prev => prev.filter(p => p.id !== planId));
    if (activePlan?.id === planId) {
      setActivePlan(null);
    }
  };

  const createGroupTrip = (data: {
    tripName: string;
    destination: string;
    dates: string;
    groupSize: number;
    sharedBudgetTarget: number;
    travelStyle: string;
  }) => {
    const code = `${data.destination.slice(0, 4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newTrip: GroupTrip = {
      id: `grp-${Date.now()}`,
      inviteCode: code,
      tripName: data.tripName,
      destination: data.destination,
      dates: data.dates,
      groupSize: data.groupSize,
      sharedBudgetTarget: data.sharedBudgetTarget,
      travelStyle: data.travelStyle,
      createdAt: new Date().toISOString(),
      members: [
        { id: 'usr-1', name: 'Aarav (You)', avatarColor: 'bg-emerald-700 text-white', role: 'Leader', status: 'Ready' },
        { id: 'usr-2', name: 'Demo Friend 1', avatarColor: 'bg-amber-600 text-white', role: 'Member', status: 'Ready' },
        { id: 'usr-3', name: 'Demo Friend 2', avatarColor: 'bg-sky-700 text-white', role: 'Member', status: 'Planning' }
      ],
      votingOptions: [
        {
          id: `vote-${Date.now()}-1`,
          category: 'Activity',
          title: `Explore ${data.destination} Highlight Viewpoints`,
          description: 'Sunset landscape viewing and group photos',
          votedUserIds: ['usr-1'],
          suggestedBy: 'Aarav (You)'
        }
      ],
      sharedItinerary: [
        {
          id: `act-${Date.now()}-1`,
          timeSlot: 'Morning',
          title: 'Group Gathering & Journey Departure',
          description: `Travel together to ${data.destination}`,
          costEstimate: Math.round(data.sharedBudgetTarget * 0.15)
        }
      ],
      expenses: []
    };

    setGroupTrips(prev => [newTrip, ...prev]);
    return newTrip.id;
  };

  const voteOnGroupOption = (tripId: string, optionId: string) => {
    setGroupTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        votingOptions: trip.votingOptions.map(opt => {
          if (opt.id !== optionId) return opt;
          const hasVoted = opt.votedUserIds.includes(currentUser.id);
          const updatedVotes = hasVoted
            ? opt.votedUserIds.filter(id => id !== currentUser.id)
            : [...opt.votedUserIds, currentUser.id];
          return { ...opt, votedUserIds: updatedVotes };
        })
      };
    }));
  };

  const addGroupExpense = (tripId: string, expense: { description: string; amount: number; paidByMemberId: string; category: string; splitAmongMemberIds: string[] }) => {
    const newExpense: GroupExpenseItem = {
      id: `exp-${Date.now()}`,
      ...expense
    };
    setGroupTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        expenses: [newExpense, ...trip.expenses]
      };
    }));
  };

  const addSharedItineraryItem = (tripId: string, item: { timeSlot: 'Morning' | 'Afternoon' | 'Evening'; title: string; description: string; costEstimate: number; location?: string }) => {
    const newItem: ActivityItem = {
      id: `act-shared-${Date.now()}`,
      ...item
    };
    setGroupTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        sharedItinerary: [...trip.sharedItinerary, newItem]
      };
    }));
  };

  const updateUserPreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...prefs }));
  };

  return (
    <TravelContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        savedItineraries,
        saveItinerary,
        deleteSavedItinerary,
        activePlan,
        setActivePlan,
        groupTrips,
        createGroupTrip,
        voteOnGroupOption,
        addGroupExpense,
        addSharedItineraryItem,
        userPreferences,
        updateUserPreferences,
        currentUser
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
