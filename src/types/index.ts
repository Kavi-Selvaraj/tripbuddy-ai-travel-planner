export type TravelCategory = 
  | 'Beaches'
  | 'Mountains'
  | 'Nature'
  | 'Adventure'
  | 'Historical'
  | 'Romantic'
  | 'Weekend'
  | 'Family-friendly'
  | 'Budget'
  | 'Hidden gems'
  | 'Backpacking'
  | 'Photography'
  | 'Relaxation'
  | 'Food & Culture';

export type TravelStyle = 
  | 'Relaxation'
  | 'Adventure'
  | 'Nature'
  | 'Food & Culture'
  | 'Photography'
  | 'Backpacking'
  | 'Luxury'
  | 'Budget Travel';

export type WeatherMood = 'Cool' | 'Sunny' | 'Mild' | 'Monsoon' | 'Pleasant';

export interface WeatherInfo {
  avgTempMin: number;
  avgTempMax: number;
  condition: string;
  rainfallChance: number;
  bestMonths: string[];
  climateSummary: string;
  packingTips: string[];
  seasonalAlert?: string;
}

export interface Attraction {
  name: string;
  description: string;
  category: string;
  suggestedDuration: string;
  entryFee?: string;
  bestTimeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
}

export interface LocalFood {
  name: string;
  description: string;
  isVeg: boolean;
  mustTrySpot?: string;
}

export interface AccommodationArea {
  name: string;
  description: string;
  vibe: string;
  priceRange: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  region: 'South India' | 'North India' | 'West India' | 'East & North-East India';
  shortDescription: string;
  overview: string;
  image: string;
  gallery: string[];
  categories: TravelCategory[];
  indicativeBudgetPerPerson: number; // in INR
  suggestedDurationDays: number;
  bestSeason: string;
  idealWeatherMood: WeatherMood;
  weather: WeatherInfo;
  topAttractions: Attraction[];
  recommendedActivities: string[];
  localFoods: LocalFood[];
  suggestedAccommodationAreas: AccommodationArea[];
  transportGuidance: {
    nearestAirport: string;
    nearestRailway: string;
    roadAccess: string;
  };
  travelTips: string[];
  nearbyDestinations: string[];
  rating: number;
  reviewCount: number;
  fallbackImage?: string;
}

export interface HiddenGem {
  id: string;
  name: string;
  location: string;
  state: string;
  region: 'South India' | 'North India' | 'West India' | 'East & North-East India';
  image: string;
  fallbackImage?: string;
  whyVisit: string;
  estimatedBudget: number;
  suggestedDuration: string;
  bestSeason: string;
  difficulty: 'Easy' | 'Moderate' | 'Adventurous';
  accessibilityNotes: string;
  responsibleTourismTips: string;
  highlights: string[];
  travelMood: WeatherMood;
}

export interface ActivityItem {
  id: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  location?: string;
  costEstimate: number; // in INR
  travelTimeNote?: string;
  tips?: string;
}

export interface DayItinerary {
  dayNumber: number;
  dateStr?: string;
  theme: string;
  morning: ActivityItem[];
  afternoon: ActivityItem[];
  evening: ActivityItem[];
  dayExpenseEstimate: number;
  dayTips: string;
}

export interface TripPlan {
  id: string;
  tripTitle: string;
  destinationId: string;
  destinationName: string;
  startingCity: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  travellersCount: number;
  totalBudget: number; // in INR
  travelStyle: TravelStyle;
  preferredTransport: 'Flight' | 'Train' | 'Road / Self-Drive' | 'Bus';
  accommodationType: 'Budget Hostels / Homestays' | 'Mid-range Hotels & Resorts' | 'Luxury Heritage Stays';
  days: DayItinerary[];
  createdAt: string;
  isAiGenerated?: boolean;
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  localTransport: number;
  activities: number;
  miscellaneous: number;
}

export interface GroupMember {
  id: string;
  name: string;
  avatarColor: string;
  role: 'Leader' | 'Member';
  status: 'Ready' | 'Planning' | 'Voted';
}

export interface VotingOption {
  id: string;
  category: 'Destination' | 'Activity' | 'Dining' | 'Date';
  title: string;
  description: string;
  votedUserIds: string[];
  suggestedBy: string;
}

export interface GroupExpenseItem {
  id: string;
  description: string;
  amount: number;
  paidByMemberId: string;
  category: string;
  splitAmongMemberIds: string[];
}

export interface GroupTrip {
  id: string;
  inviteCode: string;
  tripName: string;
  destination: string;
  destinationId?: string;
  dates: string;
  groupSize: number;
  sharedBudgetTarget: number;
  travelStyle: string;
  members: GroupMember[];
  votingOptions: VotingOption[];
  sharedItinerary: ActivityItem[];
  expenses: GroupExpenseItem[];
  createdAt: string;
}

export interface TravelGuide {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  author: string;
  publishDate: string;
  summary: string;
  coverImage?: string;
  fallbackImage?: string;
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
  }[];
}

export interface UserPreferences {
  name: string;
  homeCity: string;
  preferredStyle: TravelStyle;
  typicalBudgetMin: number;
  typicalBudgetMax: number;
  dietaryPreference: 'All' | 'Vegetarian' | 'Vegan';
}
