import { TravelGuide } from '../types';
import { GUIDE_IMAGES } from './destinationImages';

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: 'budget-travel-india',
    title: 'The Smart Backpacker’s Guide to Traveling Across India',
    subtitle: 'How to experience the richness of Indian travel for under ₹1,500 per day without missing out on culture.',
    readTime: '6 min read',
    category: 'Budget Travel',
    author: 'Rohan Sharma, Travel Writer',
    publishDate: 'Updated Oct 2026',
    summary: 'Travel across India doesn’t need deep pockets. With sleeper trains, local homestays, community thalis, and state transport buses, you can explore richer cultures for a fraction of commercial tour costs.',
    coverImage: GUIDE_IMAGES['budget-travel-india'].primary,
    fallbackImage: GUIDE_IMAGES['budget-travel-india'].fallback,
    sections: [
      {
        heading: 'Mastering the Indian Railways Network',
        content: 'Indian Railways remains the backbone of budget travel. For overnight journeys, 3AC and Sleeper Class offer tremendous savings while saving a night’s hotel expense. Book your tickets via IRCTC 30 to 60 days ahead.',
        bulletPoints: [
          'Choose overnight trains to save on hotel room bills',
          'Opt for 3AC for air-conditioned comfort or Sleeper for authentic countryside views',
          'Use apps like Where Is My Train for real-time offline platform and GPS tracking'
        ]
      },
      {
        heading: 'Dining Like a Local: The Power of the Regional Thali',
        content: 'Avoid tourist-strip restaurants that inflate prices for bland continental food. Seek out family-run bhojanalayas, military messes, and temple canteens where fresh, wholesome unlimited thalis are served for ₹80 to ₹150.',
        bulletPoints: [
          'Look for busy local eateries with high turnover — high footfall guarantees fresh cooking',
          'Opt for boiled water or carry a reusable bottle with a purifier filter to avoid single-use plastics'
        ]
      },
      {
        heading: 'Accommodation: Hostels & Heritage Homestays',
        content: 'India’s hostel revolution has created clean, community-driven hubs in almost every scenic destination. Bunk beds with lockers, clean shared kitchens, and rooftop cafes provide safe hubs to meet fellow wanderers.'
      }
    ]
  },
  {
    id: 'western-ghats-weekend',
    title: 'The 48-Hour Escape: Best Weekend Circuits in South India',
    subtitle: 'From misty coffee plantations to turquoise secret beaches within 5 hours of major metros.',
    readTime: '5 min read',
    category: 'Weekend Escapes',
    author: 'Ananya Rao, TripBuddy Curator',
    publishDate: 'Oct 2026',
    summary: 'Need a fast break from the city? Here are tested 2-day itineraries from Bengaluru, Chennai, and Kochi that maximize mountain vistas and coastal tranquility.',
    coverImage: GUIDE_IMAGES['western-ghats-weekend'].primary,
    fallbackImage: GUIDE_IMAGES['western-ghats-weekend'].fallback,
    sections: [
      {
        heading: 'The Bengaluru to Chikmagalur / Coorg Ridge Route',
        content: 'Start at 5:00 AM on Saturday to beat city outbound traffic. Stop at Kunigal or Hassan for crisp thatte idli and filter coffee. Check into your coffee estate homestay by 11:30 AM.',
        bulletPoints: [
          'Saturday Afternoon: Private plantation walk and spice tasting session',
          'Saturday Sunset: Raja’s Seat or Mullayanagiri summit breeze',
          'Sunday Morning: Waterfalls and local tribal market before an easy drive back'
        ]
      },
      {
        heading: 'The Chennai to Pondicherry Coastal Drive',
        content: 'The East Coast Road (ECR) hugs the Bay of Bengal for 140 km. Stop at Mahabalipuram shore temples for early morning golden light before checking into a French Quarter villa in White Town.'
      }
    ]
  },
  {
    id: 'packing-checklist-india',
    title: 'The Universal Packing Checklist for Indian Terrains',
    subtitle: 'Everything you actually need for switching between chilly hill stations and humid coastlines.',
    readTime: '4 min read',
    category: 'Packing & Prep',
    author: 'Vikram Joshi, Outdoor Instructor',
    publishDate: 'Sep 2026',
    summary: 'A minimalist packing philosophy tailored to Indian weather swings, religious site etiquette, and adventure needs.',
    coverImage: GUIDE_IMAGES['packing-checklist-india'].primary,
    fallbackImage: GUIDE_IMAGES['packing-checklist-india'].fallback,
    sections: [
      {
        heading: 'Apparel & Etiquette Essentials',
        content: 'Many Indian heritage sites and temples require covered shoulders and knees. Slip-on shoes make visiting multiple sacred shrines hassle-free.',
        bulletPoints: [
          'A lightweight cotton scarf / shawl (useful for sun protection, dust, or covering head at temples)',
          '2 lightweight moisture-wicking quick-dry shirts',
          '1 light merino wool or fleece pullover for elevation drops',
          'Slip-on sandals or trail shoes that are easy to remove at monument entrances'
        ]
      },
      {
        heading: 'Health & Electronics Kit',
        content: 'Power banks and electrolyte sachets are indispensable for long bus rides and outdoor trekking.',
        bulletPoints: [
          '10,000 to 20,000 mAh Power Bank with multi-cable',
          'Oral rehydration salts (ORS) & basic motion-sickness medicines',
          'Universal plug adapter and dry-bag for electronics during monsoon or beach visits'
        ]
      }
    ]
  },
  {
    id: 'responsible-tourism',
    title: 'Leave No Trace: A Responsible Traveler’s Field Guide',
    subtitle: 'Protecting fragile hill ecosystems, supporting artisan livelihoods, and honoring local traditions.',
    readTime: '5 min read',
    category: 'Eco Travel',
    author: 'TripBuddy Editorial Team',
    publishDate: 'Aug 2026',
    summary: 'Overtourism and plastic pollution threaten our most sacred valleys and beaches. Small conscious choices make your journey a blessing rather than a burden to local communities.',
    coverImage: GUIDE_IMAGES['responsible-tourism'].primary,
    fallbackImage: GUIDE_IMAGES['responsible-tourism'].fallback,
    sections: [
      {
        heading: 'Zero Single-Use Plastic in Mountain Watersheds',
        content: 'Remote Himalayan and Western Ghats villages lack municipal recycling facilities. Every plastic bottle left behind remains in rivers for centuries.',
        bulletPoints: [
          'Carry a stainless steel or insulated bottle; refill at verified RO water points or homestays',
          'Pack a small pocket trash bag on every trek and carry your snack wrappers back to town'
        ]
      },
      {
        heading: 'Direct Support to Indigenous Artisans & Farmers',
        content: 'Bypass commercial tourist middlemen by buying tea, coffee, spices, and pottery directly from village co-operatives, self-help groups, and local markets.'
      }
    ]
  }
];
