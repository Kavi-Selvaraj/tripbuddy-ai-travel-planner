import { ActivityItem, DayItinerary, Destination, TravelStyle, TripPlan } from '../types';
import { DESTINATIONS } from '../data/destinations';

export function generateStructuredItinerary(
  destinationId: string,
  startingCity: string,
  daysCount: number,
  totalBudget: number,
  travelStyle: TravelStyle,
  transportType: 'Flight' | 'Train' | 'Road / Self-Drive' | 'Bus',
  accommodationType: 'Budget Hostels / Homestays' | 'Mid-range Hotels & Resorts' | 'Luxury Heritage Stays'
): TripPlan {
  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  const days: DayItinerary[] = [];

  const perDayBudget = Math.round(totalBudget / Math.max(daysCount, 1));
  const attractions = [...dest.topAttractions];
  const foods = [...dest.localFoods];
  const activities = [...dest.recommendedActivities];

  for (let i = 1; i <= daysCount; i++) {
    const dayTheme = i === 1 
      ? `Arrival, Scenic Settling & Landmark Orientation` 
      : i === daysCount 
      ? `Local Flavors, Souvenirs & Sunset Farewell`
      : `Deep Dive: Nature, Trails & Heritage Secrets`;

    const morningAttraction = attractions[(i * 2 - 2) % attractions.length];
    const afternoonAttraction = attractions[(i * 2 - 1) % attractions.length];
    const foodItem = foods[(i - 1) % foods.length];
    const recActivity = activities[(i - 1) % activities.length];

    const morningActivities: ActivityItem[] = [
      {
        id: `act-${i}-m1`,
        timeSlot: 'Morning',
        title: i === 1 ? `Arrive from ${startingCity} & Check-in` : `Sunrise View & ${morningAttraction.name}`,
        description: i === 1 
          ? `Arrival via ${transportType}. Check into your ${accommodationType.toLowerCase()} accommodation and enjoy fresh local refreshments.`
          : `Head out early to enjoy ${morningAttraction.description} while the morning light is soft and weather is crisp.`,
        location: morningAttraction.name,
        costEstimate: i === 1 ? Math.round(perDayBudget * 0.15) : Math.round(perDayBudget * 0.1),
        travelTimeNote: '25-35 mins local transfer',
        tips: morningAttraction.bestTimeOfDay ? `Ideal in the ${morningAttraction.bestTimeOfDay.toLowerCase()}` : undefined
      }
    ];

    const afternoonActivities: ActivityItem[] = [
      {
        id: `act-${i}-a1`,
        timeSlot: 'Afternoon',
        title: `Authentic Lunch: ${foodItem.name}`,
        description: `Savor ${foodItem.description} at ${foodItem.mustTrySpot || 'a beloved local dining spot'}.`,
        location: foodItem.mustTrySpot || `${dest.name} Town`,
        costEstimate: Math.round(perDayBudget * 0.18),
        travelTimeNote: '15 mins walking / auto',
        tips: foodItem.isVeg ? 'Vegetarian friendly' : 'Non-veg delicacy'
      },
      {
        id: `act-${i}-a2`,
        timeSlot: 'Afternoon',
        title: afternoonAttraction.name,
        description: afternoonAttraction.description,
        location: afternoonAttraction.name,
        costEstimate: Math.round(perDayBudget * 0.12),
        travelTimeNote: '20-30 mins transit',
        tips: afternoonAttraction.entryFee || 'Free entry'
      }
    ];

    const eveningActivities: ActivityItem[] = [
      {
        id: `act-${i}-e1`,
        timeSlot: 'Evening',
        title: recActivity,
        description: `Engage in ${recActivity.toLowerCase()}. Soak in the atmosphere, capture golden hour photographs, and relax.`,
        location: dest.name,
        costEstimate: Math.round(perDayBudget * 0.15),
        travelTimeNote: '15 mins stroll',
        tips: 'Bring camera & comfortable footwear'
      },
      {
        id: `act-${i}-e2`,
        timeSlot: 'Evening',
        title: `Leisure Dinner & Night Breeze`,
        description: `Unwind at a cozy cafe or garden restaurant. Review memories, sample regional desserts, and rest for the next day.`,
        costEstimate: Math.round(perDayBudget * 0.2),
        tips: 'Advance table reservation recommended during peak season'
      }
    ];

    const dayExpenseEstimate = morningActivities.reduce((s, a) => s + a.costEstimate, 0)
      + afternoonActivities.reduce((s, a) => s + a.costEstimate, 0)
      + eveningActivities.reduce((s, a) => s + a.costEstimate, 0);

    days.push({
      dayNumber: i,
      theme: dayTheme,
      morning: morningActivities,
      afternoon: afternoonActivities,
      evening: eveningActivities,
      dayExpenseEstimate,
      dayTips: `Day ${i} Tip: Keep comfortable walking shoes and stay hydrated. Local transport is easily accessible.`
    });
  }

  const newPlan: TripPlan = {
    id: `trip-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    tripTitle: `${daysCount}-Day ${travelStyle} Escape to ${dest.name}`,
    destinationId: dest.id,
    destinationName: dest.name,
    startingCity,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + daysCount * 86400000).toISOString().split('T')[0],
    daysCount,
    travellersCount: 1,
    totalBudget,
    travelStyle,
    preferredTransport: transportType,
    accommodationType,
    days,
    createdAt: new Date().toISOString(),
    isAiGenerated: false
  };

  return newPlan;
}

export function formatItineraryForClipboard(plan: TripPlan): string {
  let text = `==============================\n`;
  text += `TRIPBUDDY ITINERARY: ${plan.tripTitle}\n`;
  text += `Destination: ${plan.destinationName} | Origin: ${plan.startingCity}\n`;
  text += `Duration: ${plan.daysCount} Days | Travellers: ${plan.travellersCount}\n`;
  text += `Total Allocated Budget: ₹${plan.totalBudget.toLocaleString('en-IN')}\n`;
  text += `Travel Style: ${plan.travelStyle} | Transport: ${plan.preferredTransport}\n`;
  text += `==============================\n\n`;

  plan.days.forEach((day) => {
    text += `--- DAY ${day.dayNumber}: ${day.theme} ---\n`;
    text += `Estimated Day Expenses: ₹${day.dayExpenseEstimate.toLocaleString('en-IN')}\n\n`;

    text += `[MORNING]\n`;
    day.morning.forEach((act) => {
      text += `• ${act.title} (₹${act.costEstimate}) - ${act.description}\n`;
    });

    text += `\n[AFTERNOON]\n`;
    day.afternoon.forEach((act) => {
      text += `• ${act.title} (₹${act.costEstimate}) - ${act.description}\n`;
    });

    text += `\n[EVENING]\n`;
    day.evening.forEach((act) => {
      text += `• ${act.title} (₹${act.costEstimate}) - ${act.description}\n`;
    });

    text += `\nTip: ${day.dayTips}\n\n`;
  });

  text += `Organized with TripBuddy — Less Planning Stress. More Travel Stories.\n`;
  return text;
}
