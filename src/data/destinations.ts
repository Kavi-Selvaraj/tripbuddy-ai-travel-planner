import { Destination } from '../types';
import { DESTINATION_IMAGES, TRAVEL_MOOD_IMAGES } from './destinationImages';

export const DESTINATIONS: Destination[] = [
  {
    id: 'coorg',
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    region: 'South India',
    shortDescription: 'The Scotland of India, famed for mist-covered coffee estates, aromatic spice plantations, and cascading waterfalls.',
    overview: 'Nestled amidst the Western Ghats at an elevation of 1,170 meters, Coorg is a haven of tranquil coffee plantations, Kodava martial hospitality, dense shola forests, and panoramic viewpoint peaks. Perfect for peaceful retreats, aromatic estate walks, and authentic homestay experiences.',
    image: DESTINATION_IMAGES['coorg'].primary,
    fallbackImage: DESTINATION_IMAGES['coorg'].fallback,
    gallery: DESTINATION_IMAGES['coorg'].gallery,
    categories: ['Mountains', 'Nature', 'Romantic', 'Weekend', 'Family-friendly'],
    indicativeBudgetPerPerson: 7500,
    suggestedDurationDays: 3,
    bestSeason: 'October to March (Post-monsoon freshness)',
    idealWeatherMood: 'Cool',
    weather: {
      avgTempMin: 15,
      avgTempMax: 24,
      condition: 'Pleasant & Misty with Crisp Breezes',
      rainfallChance: 15,
      bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
      climateSummary: 'Cool temperate climate with frequent morning mists. Monsoons (June-Sept) are torrential, while winters are crisp and dry.',
      packingTips: ['Light woolens or fleece jacket', 'Comfortable trail walking shoes', 'Umbrella or light rain jacket', 'Mosquito repellent for estate trails']
    },
    topAttractions: [
      {
        name: 'Abbey Falls & Hanging Bridge',
        description: 'Roaring waterfall nestled deep within aromatic private coffee and spice plantations.',
        category: 'Nature & Waterfalls',
        suggestedDuration: '1.5 hours',
        entryFee: '₹15 per person',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Raja’s Seat & Viewpoint Gardens',
        description: 'Historic seasonal garden perched on a cliff edge where Kodagu kings enjoyed sunset views over rolling valleys.',
        category: 'Scenic Viewpoint',
        suggestedDuration: '1 hour',
        entryFee: '₹20 per person',
        bestTimeOfDay: 'Evening'
      },
      {
        name: 'Namdroling Golden Temple (Bylakuppe)',
        description: 'Second largest Tibetan settlement outside Dharamshala, featuring 40-foot golden statues and vibrant murals.',
        category: 'Spiritual & Culture',
        suggestedDuration: '2 hours',
        entryFee: 'Free entry',
        bestTimeOfDay: 'Afternoon'
      },
      {
        name: 'Dubare Elephant Camp & Kaveri River',
        description: 'Historic forest camp on the banks of River Kaveri offering river crossings, naturalist talks, and elephant conservation viewing.',
        category: 'Wildlife & Nature',
        suggestedDuration: '2.5 hours',
        entryFee: '₹100 (plus boating)',
        bestTimeOfDay: 'Morning'
      }
    ],
    recommendedActivities: [
      'Private coffee estate tasting and bean-to-cup plantation walk',
      'Trek to Mandalpatti peak on a 4x4 off-road jeep trail',
      'Riverside picnic and gentle coracle ride on River Kaveri',
      'Stargazing from a heritage Kodava family homestay'
    ],
    localFoods: [
      {
        name: 'Pandi Curry & Kadambuttu',
        description: 'Classic Kodava pork curry infused with dark kachampuli vinegar, paired with steamed rice balls.',
        isVeg: false,
        mustTrySpot: 'Coorg Cuisine, Madikeri'
      },
      {
        name: 'Akki Roti with Bamboo Shoot Curry',
        description: 'Crisp hand-flattened rice rotis served with wild bamboo shoot (baimbale) gravy in season.',
        isVeg: true,
        mustTrySpot: 'Raintree Restaurant, Madikeri'
      },
      {
        name: 'Fresh Estate Filter Coffee',
        description: 'Locally grown Peaberry and Arabica roast served with thick milk and jaggery.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Madikeri Town & Surrounds',
        description: 'Convenient access to restaurants, viewpoints, and transport hubs.',
        vibe: 'Central & Accessible',
        priceRange: '₹2,000 - ₹5,500/night'
      },
      {
        name: 'Pollibetta & Virajpet Coffee Estates',
        description: 'Secluded heritage plantation bungalows surrounded by dense pepper vines and silver oaks.',
        vibe: 'Peaceful & Immersive',
        priceRange: '₹3,500 - ₹11,000/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Kannur International (CNN) - 90 km, or Mangalore (IXE) - 135 km',
      nearestRailway: 'Mysuru Junction (MYS) - 118 km (Regular KSRTC buses & private cabs)',
      roadAccess: 'Excellent highway connection from Bengaluru (approx. 5.5 hours via Mysore expressway)'
    },
    travelTips: [
      'Book a 4x4 jeep in advance for Mandalpatti; normal hatchbacks cannot negotiate the final rocky terrain.',
      'Buy authentic Kachampuli vinegar and unpolished spices directly from plantation co-operatives in Madikeri.',
      'Drive carefully during morning mist hours when visibility drops along ghat hairpin bends.'
    ],
    nearbyDestinations: ['Chikmagalur', 'Wayanad', 'Mysore', 'Bekal'],
    rating: 4.8,
    reviewCount: 1420
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    region: 'South India',
    shortDescription: 'A surreal UNESCO World Heritage realm of 14th-century Vijayanagara granite temples and boulder-strewn rivers.',
    overview: 'Hampi transports travellers into a mystical world of monumental stone ruins, monolithic deities, ancient bazaars, and boulder landscapes set along the rushing Tungabhadra River. From sunrise atop Matanga Hill to cycling through royal enclosures, it is an unparalleled historical marvel.',
    image: DESTINATION_IMAGES['hampi'].primary,
    fallbackImage: DESTINATION_IMAGES['hampi'].fallback,
    gallery: DESTINATION_IMAGES['hampi'].gallery,
    categories: ['Historical', 'Adventure', 'Backpacking', 'Budget', 'Photography'],
    indicativeBudgetPerPerson: 5800,
    suggestedDurationDays: 3,
    bestSeason: 'October to March (Pleasant winter sunshine)',
    idealWeatherMood: 'Sunny',
    weather: {
      avgTempMin: 18,
      avgTempMax: 31,
      condition: 'Sunny with Clear Blue Skies',
      rainfallChance: 5,
      bestMonths: ['November', 'December', 'January', 'February'],
      climateSummary: 'Semi-arid climate with intense daytime sun in summer. Winters offer cool crisp mornings and comfortable exploring weather.',
      packingTips: ['Wide-brim sun hat and sunglasses', 'High-SPF sunscreen', 'Breathable linen or cotton clothing', 'Sturdy walking shoes for rock climbing']
    },
    topAttractions: [
      {
        name: 'Vijaya Vittala Temple & Stone Chariot',
        description: 'Masterpiece of Dravidian architecture featuring the iconic stone chariot and musical pillars.',
        category: 'Heritage Landmark',
        suggestedDuration: '2.5 hours',
        entryFee: '₹40 (ASI ticket includes museum & Zenana enclosure)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Matanga Hill Sunrise Point',
        description: 'Highest point in central Hampi offering panoramic 360-degree views over temple spires and boulder ranges.',
        category: 'Hiking & Viewpoint',
        suggestedDuration: '2 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Virupaksha Temple & River Ghats',
        description: 'Active 7th-century sanctuary dedicated to Lord Shiva with a towering 50-meter gopuram along the Tungabhadra.',
        category: 'Living Temple & Heritage',
        suggestedDuration: '1.5 hours',
        entryFee: '₹25',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Lotus Mahal & Elephant Stables',
        description: 'Symmetric Indo-Islamic royal pleasure pavilion constructed with terracotta mortar in the Zenana enclosure.',
        category: 'Royal Architecture',
        suggestedDuration: '1.5 hours',
        entryFee: 'Included in ASI pass',
        bestTimeOfDay: 'Afternoon'
      }
    ],
    recommendedActivities: [
      'Renting a bicycle to explore the vast Sacred Centre along ancient cart paths',
      'Coracle boat ride across the swirling Tungabhadra River',
      'Sunset bouldering and chill session at Sanapur Lake',
      'Cafe hopping in the Hippie Island / Anegundi rural village'
    ],
    localFoods: [
      {
        name: 'North Karnataka Jolada Roti Thali',
        description: 'Jowar flatbread served with yennegai (stuffed brinjal), kaalu curry, shenga chutney, and fresh buttermilk.',
        isVeg: true,
        mustTrySpot: 'Mango Tree Restaurant, Hampi'
      },
      {
        name: 'Goli Baje & Filter Coffee',
        description: 'Crispy fried Mangalore buns served hot at sunrise stalls by the Tungabhadra bathing ghats.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Hampi Bazaar / Kamalapura',
        description: 'Right next to major heritage monuments and ASI museum.',
        vibe: 'Historical & Convenient',
        priceRange: '₹1,500 - ₹6,000/night'
      },
      {
        name: 'Anegundi / Sanapur',
        description: 'Scenic paddy fields, palm trees, backpacker guesthouses, and boulder cafes.',
        vibe: 'Bohemian & Laid-back',
        priceRange: '₹1,200 - ₹3,800/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Jindal Vidyanagar Toranagallu (VDY) - 38 km, or Hubli (HBX) - 145 km',
      nearestRailway: 'Hosapete Junction (HPT) - 12 km (Frequent autos and local buses run to Hampi)',
      roadAccess: 'NH50 links Hospet easily to Bengaluru (approx. 6.5 hours) and Goa (approx. 7 hours)'
    },
    travelTips: [
      'Wear slip-on shoes or comfortable sandals as shoes must be removed when entering temple sanctums.',
      'Carry plenty of water and hydration salts while climbing Matanga Hill.',
      'Purchase the unified ASI ticket online at the entrance gate to skip manual queues.'
    ],
    nearbyDestinations: ['Badami', 'Aihole', 'Pattadakal', 'Gokarna'],
    rating: 4.9,
    reviewCount: 2150
  },
  {
    id: 'goa',
    name: 'South & North Goa',
    state: 'Goa',
    region: 'West India',
    shortDescription: 'Sun-drenched golden coastlines, Portuguese colonial villas, serene backwaters, and vibrant coastal shacks.',
    overview: 'Beyond the vibrant nightlife lies Goa’s soulful side: pristine southern shores like Palolem and Agonda, centuries-old Portuguese churches of Old Goa, lush spice farms, and tranquil mangrove kayak trails.',
    image: DESTINATION_IMAGES['goa'].primary,
    fallbackImage: DESTINATION_IMAGES['goa'].fallback,
    gallery: DESTINATION_IMAGES['goa'].gallery,
    categories: ['Beaches', 'Relaxation', 'Food & Culture', 'Weekend', 'Romantic'],
    indicativeBudgetPerPerson: 8500,
    suggestedDurationDays: 4,
    bestSeason: 'November to February (Pleasant coastal breezes)',
    idealWeatherMood: 'Pleasant',
    weather: {
      avgTempMin: 21,
      avgTempMax: 32,
      condition: 'Sunny Tropical Coastal Breezes',
      rainfallChance: 10,
      bestMonths: ['November', 'December', 'January', 'February'],
      climateSummary: 'Tropical maritime climate. Winters are sunny with soothing sea breezes, while monsoons bring verdant green landscapes.',
      packingTips: ['Light linen shirts & shorts', 'Swimwear & beach towels', 'Polarized sunglasses', 'Waterproof pouch for phones & keys']
    },
    topAttractions: [
      {
        name: 'Palolem Beach & Butterfly Island',
        description: 'Crescent-shaped white sand bay in South Goa framed by towering coconut palms and calm swim waters.',
        category: 'Beach & Island',
        suggestedDuration: 'Half Day',
        entryFee: 'Free',
        bestTimeOfDay: 'Afternoon'
      },
      {
        name: 'Fontainhas Latin Quarter (Panaji)',
        description: 'UNESCO-heritage residential district with pastel Portuguese villas, tiled roofs, and art galleries.',
        category: 'Heritage & Architecture',
        suggestedDuration: '2 hours',
        entryFee: 'Free walk',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Basilica of Bom Jesus (Old Goa)',
        description: '16th-century baroque cathedral housing the sacred relics of St. Francis Xavier.',
        category: 'Spiritual & Heritage',
        suggestedDuration: '1.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Chapora Fort & Vagator Coast',
        description: 'Historic red laterite fort overlooking the junction of Chapora river and the Arabian sea.',
        category: 'Scenic Fort Viewpoint',
        suggestedDuration: '1.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Evening'
      }
    ],
    recommendedActivities: [
      'Rent a vintage scooter to cruise the scenic palm-lined roads of Assagao and Siolim',
      'Kayaking through peaceful backwater mangrove channels in Divar Island',
      'Sunset dolphin spotting boat ride off Palolem beach',
      'Dining at authentic beach shacks under ambient lantern light'
    ],
    localFoods: [
      {
        name: 'Goan Fish Curry Thali',
        description: 'Kingfish or Pomfret curry prepared in spiced coconut and kokum gravy, served with red ukda rice and kismoor.',
        isVeg: false,
        mustTrySpot: 'Vinayak Family Restaurant, Assagao'
      },
      {
        name: 'Poi with Mushroom Xacuti',
        description: 'Traditional wood-fired Goan crusty bread with roasted coconut and poppy seed curry.',
        isVeg: true,
        mustTrySpot: 'Viva Panjim, Fontainhas'
      },
      {
        name: 'Bebinca',
        description: 'Decadent multi-layered Goan coconut milk and jaggery dessert baked patiently layer by layer.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Palolem / Agonda (South Goa)',
        description: 'Quiet beachfront wooden huts, yoga retreats, and pristine swimming waters.',
        vibe: 'Peaceful & Romantic',
        priceRange: '₹2,500 - ₹9,000/night'
      },
      {
        name: 'Anjuna / Assagao / Vagator (North Goa)',
        description: 'Boutique heritage villas, trendy cafes, designer boutiques, and sunset viewpoints.',
        vibe: 'Trendy & Social',
        priceRange: '₹3,000 - ₹12,000/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Goa Dabolim (GOI) or Manohar International Airport Mopa (GOX)',
      nearestRailway: 'Madgaon Junction (MAO) for South Goa or Thivim (THVM) for North Goa',
      roadAccess: 'NH66 connects smoothly to Mumbai, Pune, and Mangalore'
    },
    travelTips: [
      'Rent a two-wheeler with a yellow commercial license plate to ensure full legal compliance and safety.',
      'Respect swimming safety flags along the coast and never enter deep water after sunset.',
      'Support local community beach cleaners by taking your trash with you.'
    ],
    nearbyDestinations: ['Gokarna', 'Dudhsagar', 'Tarkarli'],
    rating: 4.8,
    reviewCount: 3890
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    shortDescription: 'The royal Pink City of majestic hilltop forts, vibrant bazaars, and Rajput architectural grandeur.',
    overview: 'Founded in 1727, Jaipur is a living celebration of royal Rajasthani heritage. Home to the honeycomb facade of Hawa Mahal, the formidable ramparts of Amber Fort, astronomical wonders of Jantar Mantar, and bustling bazaars brimming with textiles and jewelry.',
    image: DESTINATION_IMAGES['jaipur'].primary,
    fallbackImage: DESTINATION_IMAGES['jaipur'].fallback,
    gallery: DESTINATION_IMAGES['jaipur'].gallery,
    categories: ['Historical', 'Food & Culture', 'Photography', 'Family-friendly', 'Romantic'],
    indicativeBudgetPerPerson: 7200,
    suggestedDurationDays: 3,
    bestSeason: 'October to March (Crisp desert winters)',
    idealWeatherMood: 'Pleasant',
    weather: {
      avgTempMin: 12,
      avgTempMax: 26,
      condition: 'Crisp Sunshine & Cool Evening Breeze',
      rainfallChance: 5,
      bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
      climateSummary: 'Hot semi-arid climate. Summer temperatures can exceed 40°C, making the dry, crisp winter period the ultimate season to visit.',
      packingTips: ['Layered clothing (warm evening jacket + light daytime cottons)', 'Walking sneakers for cobbled fort ramparts', 'Sun protection for outdoor monuments']
    },
    topAttractions: [
      {
        name: 'Amber Fort & Sheesh Mahal',
        description: 'Imposing hilltop citadel with mirror-mosaic palaces, courtyards, and panoramic Aravalli views.',
        category: 'Fortress & Palace',
        suggestedDuration: '3 hours',
        entryFee: '₹100 (Indians) / ₹500 (Foreigners)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Hawa Mahal (Palace of Winds)',
        description: 'Iconic five-story pink sandstone honeycomb facade with 953 jharokhas designed for royal court ladies.',
        category: 'Architectural Icon',
        suggestedDuration: '1 hour',
        entryFee: '₹50',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'City Palace & Chandra Mahal',
        description: 'Opulent royal complex combining Mughal and Rajput architecture, museums, and courtyards.',
        category: 'Royal Palace',
        suggestedDuration: '2 hours',
        entryFee: '₹200',
        bestTimeOfDay: 'Afternoon'
      },
      {
        name: 'Nahargarh Fort Sunset Point',
        description: 'Strategic fort along the edge of the Aravalli hills overlooking the twinkling cityscape at dusk.',
        category: 'Scenic Fort Viewpoint',
        suggestedDuration: '2 hours',
        entryFee: '₹50',
        bestTimeOfDay: 'Evening'
      }
    ],
    recommendedActivities: [
      'Early morning hot air balloon flight over the Aravalli hills and Amber citadel',
      'Artisanal block printing workshop in Sanganer village',
      'Street food safari through Johari Bazaar and Bapu Bazaar',
      'Sunset tea at Padao restaurant atop Nahargarh Fort'
    ],
    localFoods: [
      {
        name: 'Dal Baati Churma',
        description: 'Crisp baked wheat balls soaked in pure desi ghee, served with panchmel dal and sweet powdered jaggery churma.',
        isVeg: true,
        mustTrySpot: 'Laxmi Mishthan Bhandar (LMB), Johari Bazaar'
      },
      {
        name: 'Pyaaz Kachori with Mint Chutney',
        description: 'Flaky deep-fried pastry stuffed with spiced caramelized onions and potatoes.',
        isVeg: true,
        mustTrySpot: 'Rawat Mishthan Bhandar, Station Road'
      },
      {
        name: 'Laal Maas',
        description: 'Traditional Rajput slow-cooked mutton curry rich in Mathania red chilies and smoky spices.',
        isVeg: false,
        mustTrySpot: 'Handi Restaurant, MI Road'
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Civil Lines / C-Scheme',
        description: 'Green, upscale residential enclave with trendy cafes and boutique hotels.',
        vibe: 'Modern & Sophisticated',
        priceRange: '₹3,000 - ₹9,000/night'
      },
      {
        name: 'Old Walled City / Pink City',
        description: 'Centuries-old restored havelis within walking distance of colourful bazaars.',
        vibe: 'Heritage & Immersive',
        priceRange: '₹2,000 - ₹6,500/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Jaipur International Airport (JAI) - 12 km from city center',
      nearestRailway: 'Jaipur Junction (JP) - Main hub connected to Delhi, Mumbai, and all metros',
      roadAccess: 'Delhi-Mumbai Expressway connects Delhi to Jaipur in under 3.5 hours'
    },
    travelTips: [
      'Buy the composite monument entry pass to save money and avoid separate ticket lines.',
      'Visit Hawa Mahal early in the morning when the eastern sunlight illuminates the pink facade.',
      'Bargain politely in traditional bazaars like Johari and Tripolia for blue pottery and textiles.'
    ],
    nearbyDestinations: ['Pushkar', 'Udaipur', 'Ranthambore', 'Shekhawati'],
    rating: 4.8,
    reviewCount: 3120
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    region: 'South India',
    shortDescription: 'Endless rolling emerald tea plantations, cool mountain mist, and Nilgiri Tahr sanctuaries.',
    overview: 'Perched at 1,600 meters in Kerala’s Western Ghats, Munnar captivates with sweeping green valleys draped in manicured tea gardens, cool mountain breezes, endangered Nilgiri Tahr at Eravikulam, and tranquil mountain lakes.',
    image: DESTINATION_IMAGES['munnar'].primary,
    fallbackImage: DESTINATION_IMAGES['munnar'].fallback,
    gallery: DESTINATION_IMAGES['munnar'].gallery,
    categories: ['Mountains', 'Nature', 'Romantic', 'Weekend', 'Family-friendly'],
    indicativeBudgetPerPerson: 7000,
    suggestedDurationDays: 3,
    bestSeason: 'September to March (Crisp post-monsoon greenery)',
    idealWeatherMood: 'Cool',
    weather: {
      avgTempMin: 13,
      avgTempMax: 22,
      condition: 'Crisp & Mountain Mist with Cool Breezes',
      rainfallChance: 15,
      bestMonths: ['October', 'November', 'December', 'January', 'February'],
      climateSummary: 'Subtropical highland climate. Temperatures can dip below 10°C in December and January nights, with glorious sunny afternoons.',
      packingTips: ['Warm fleece jacket and thermal layer for nights', 'Comfortable walking shoes', 'Moisturizer & lip balm', 'Rain cover for electronics']
    },
    topAttractions: [
      {
        name: 'Eravikulam National Park (Rajamalai)',
        description: 'Sanctuary for the endangered Nilgiri Tahr goat and home to Anamudi, South India’s highest peak.',
        category: 'Wildlife & National Park',
        suggestedDuration: '3 hours',
        entryFee: '₹200 (includes park shuttle bus)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Tea Museum & CTC Processing Factory',
        description: 'Historical museum tracing the evolution of Munnar tea plantations from 1880s pioneers.',
        category: 'Heritage & Tea Culture',
        suggestedDuration: '1.5 hours',
        entryFee: '₹125 (includes tea tasting)',
        bestTimeOfDay: 'Afternoon'
      },
      {
        name: 'Mattupetty Dam & Eco Point',
        description: 'Storage concrete dam surrounded by rolling tea gardens with speedboating and natural echo phenomenon.',
        category: 'Scenic Lake',
        suggestedDuration: '2 hours',
        entryFee: '₹40 (boating separate)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Top Station Viewpoint',
        description: 'Historic ropeway station on the Kerala-Tamil Nadu border offering views into the Theni Valley clouds.',
        category: 'Panoramic Viewpoint',
        suggestedDuration: '2 hours',
        entryFee: '₹30',
        bestTimeOfDay: 'Morning'
      }
    ],
    recommendedActivities: [
      'Early sunrise hike to Kolukkumalai (world’s highest organic tea estate)',
      'Tea tasting and artisanal tea leaf plucking session with estate workers',
      'Boating and birdwatching in Kundala Lake',
      'Strolling along aromatic spice gardens and cardamon hills'
    ],
    localFoods: [
      {
        name: 'Kerala Parotta with Malabar Chicken Curry',
        description: 'Flaky layered pan-cooked bread paired with rich coconut-roasted aromatic chicken curry.',
        isVeg: false,
        mustTrySpot: 'Rapsy Restaurant, Munnar Town'
      },
      {
        name: 'Appam with Vegetable Stew',
        description: 'Lacy fermented rice pancakes with a soft spongy center served in mildly spiced coconut milk stew.',
        isVeg: true,
        mustTrySpot: 'Saravana Bhavan, Munnar'
      },
      {
        name: 'Freshly Brewed Green & White Tea',
        description: 'Single-origin clonal tea freshly picked and brewed on high-elevation estates.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Pallivasal / Chithirapuram',
        description: 'Perched on scenic hillsides overlooking endless green tea valleys away from town noise.',
        vibe: 'Scenic & Romantic',
        priceRange: '₹3,000 - ₹9,500/night'
      },
      {
        name: 'Munnar Town Center',
        description: 'Budget-friendly hotels, close to taxi stands, spice shops, and local restaurants.',
        vibe: 'Budget & Practical',
        priceRange: '₹1,500 - ₹4,000/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Cochin International Airport (COK) - 110 km (approx. 3.5 hours scenic ghat drive)',
      nearestRailway: 'Aluva (AWY) - 110 km or Ernakulam Junction (ERS) - 130 km',
      roadAccess: 'NH85 runs from Kochi to Munnar via scenic Cheeyappara and Valara waterfalls'
    },
    travelTips: [
      'Book Eravikulam National Park tickets online to avoid 2-hour long ticketing queues.',
      'Kolukkumalai jeep safari starts as early as 4:30 AM from Suryanelli for the famous sunrise cloud inversion.',
      'Avoid driving through ghat curves at high speed; keep headlamps on in foggy stretches.'
    ],
    nearbyDestinations: ['Wayanad', 'Thekkady', 'Alleppey', 'Vagamon'],
    rating: 4.8,
    reviewCount: 2840
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya (Shillong & Cherrapunji)',
    state: 'Meghalaya',
    region: 'East & North-East India',
    shortDescription: 'The Abode of Clouds featuring living root bridges, plunging waterfalls, and crystal-clear river canyons.',
    overview: 'Meghalaya is nature at its most raw and poetic. Walk across centuries-old living root bridges hand-woven by the Khasi people, swim in the glass-clear waters of Umngot River in Dawki, and marvel at the roar of Nohkalikai Falls plunging into deep emerald pools.',
    image: DESTINATION_IMAGES['meghalaya'].primary,
    fallbackImage: DESTINATION_IMAGES['meghalaya'].fallback,
    gallery: DESTINATION_IMAGES['meghalaya'].gallery,
    categories: ['Nature', 'Adventure', 'Hidden gems', 'Photography', 'Mountains'],
    indicativeBudgetPerPerson: 9200,
    suggestedDurationDays: 5,
    bestSeason: 'October to April (Crystal-clear waters & pleasant trekking)',
    idealWeatherMood: 'Mild',
    weather: {
      avgTempMin: 11,
      avgTempMax: 23,
      condition: 'Clear Mountain Air & Crisp Sunshine',
      rainfallChance: 12,
      bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
      climateSummary: 'World-famous for heaviest monsoon rainfall (May-Sept). Winters and spring feature sunny, dry, crisp days ideal for caving and swimming.',
      packingTips: ['Grippy hiking boots for wet rock steps', 'Quick-dry outdoor clothing', 'Comfortable daypack', 'Light warm fleece jacket']
    },
    topAttractions: [
      {
        name: 'Double Decker Living Root Bridge (Nongriat)',
        description: 'Century-old bio-engineered Ficus elastica root bridge suspended over roaring river gorges.',
        category: 'Natural Wonder',
        suggestedDuration: 'Full Day (3,500 stairs hike)',
        entryFee: '₹50 maintenance fee',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Nohkalikai Falls & Viewpoint',
        description: 'Tallest plunge waterfall in India dropping 340 meters into a mystical turquoise pool.',
        category: 'Waterfalls & Canyons',
        suggestedDuration: '2 hours',
        entryFee: '₹20',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Umngot River at Dawki',
        description: 'Incredibly transparent river where wooden country boats appear to float in mid-air above pebble beds.',
        category: 'River & Boating',
        suggestedDuration: '3 hours',
        entryFee: 'Free (Boat rides approx. ₹800 per boat)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Mawsmai & Arwah Caves',
        description: 'Limestone karst caves featuring stalactites, prehistoric fossils, and underground stream corridors.',
        category: 'Adventure & Geology',
        suggestedDuration: '2 hours',
        entryFee: '₹50',
        bestTimeOfDay: 'Afternoon'
      }
    ],
    recommendedActivities: [
      'Trek down through dense subtropical valleys to Nongriat and swim in rainbow falls pool',
      'Cliff jumping and zip-lining over Mawkdok Dympep Valley',
      'Walk through Mawlynnong, celebrated as Asia’s cleanest village',
      'Live music and indigenous food evening at a Shillong cafe'
    ],
    localFoods: [
      {
        name: 'Jadoh with Dohneiiong',
        description: 'Authentic Khasi rice delicacy cooked in aromatic meat broth, paired with tender pork in black sesame paste.',
        isVeg: false,
        mustTrySpot: 'Trattoria, Police Bazar, Shillong'
      },
      {
        name: 'Pukhlein & Red Tea (Sha Saw)',
        description: 'Crispy fried Khasi snack prepared from rice flour and jaggery, enjoyed with warm spiced black tea.',
        isVeg: true
      },
      {
        name: 'Fermented Bamboo Shoot & Tungrymbai Stew',
        description: 'Traditional fermented soybean and seasonal local vegetable dish with smoky herbs.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Sohra (Cherrapunji)',
        description: 'Cliffside cottages with sweeping views of Bangladesh plains and waterfalls.',
        vibe: 'Dramatic Nature',
        priceRange: '₹2,800 - ₹8,500/night'
      },
      {
        name: 'Shillong (Laitumkhrah / Police Bazar)',
        description: 'Vibrant cultural hub with cafes, music venues, and boutique heritage guesthouses.',
        vibe: 'Cosmopolitan & Musical',
        priceRange: '₹2,000 - ₹7,000/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Guwahati Lokpriya Gopinath Bordoloi (GAU) - 120 km to Shillong (3 hours scenic drive)',
      nearestRailway: 'Guwahati Railway Station (GHY) - major junction connected to entire India',
      roadAccess: 'Smooth four-lane NH6 highway runs from Guwahati to Shillong'
    },
    travelTips: [
      'Start the Nongriat living root bridge trek before 8 AM to avoid midday heat and steep stair fatigue.',
      'Carry a walking stick or buy a locally crafted bamboo stick at the Tyrna village trailhead.',
      'Bring cash since remote village stalls and village homestays have limited digital signal.'
    ],
    nearbyDestinations: ['Kaziranga', 'Majuli', 'Tawang'],
    rating: 4.9,
    reviewCount: 1890
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka',
    region: 'South India',
    shortDescription: 'Soulful pilgrimage town meeting secluded cliffside beaches and tranquil Arabian Sea horizons.',
    overview: 'An idyllic coastal haven where ancient Shiva temples meet untouched crescent beaches. Trek from Kudle to Om Beach, Half Moon, and Paradise Beach across coastal headlands with panoramic Arabian Sea sunsets.',
    image: DESTINATION_IMAGES['gokarna'].primary,
    fallbackImage: DESTINATION_IMAGES['gokarna'].fallback,
    gallery: DESTINATION_IMAGES['gokarna'].gallery,
    categories: ['Beaches', 'Adventure', 'Backpacking', 'Budget', 'Nature'],
    indicativeBudgetPerPerson: 5200,
    suggestedDurationDays: 3,
    bestSeason: 'October to March (Gentle sea breeze & warm sunny days)',
    idealWeatherMood: 'Pleasant',
    weather: {
      avgTempMin: 20,
      avgTempMax: 30,
      condition: 'Sunny Coastal Breezes & Warm Golden Sand',
      rainfallChance: 8,
      bestMonths: ['November', 'December', 'January', 'February'],
      climateSummary: 'Tropical coastal climate with glorious dry winters. Evenings are pleasantly breezy by the sea.',
      packingTips: ['Hiking sandals with good grip for cliff paths', 'Swimwear and quick-dry towel', 'Sun hat and polarized glasses', 'Headlamp for sunset walks back']
    },
    topAttractions: [
      {
        name: 'Om Beach & Rock Formations',
        description: 'Iconic beach naturally shaped in the sacred Hindu spiritual symbol ‘Om’ with rocky tide pools.',
        category: 'Beach & Coastal Landscape',
        suggestedDuration: 'Half Day',
        entryFee: 'Free',
        bestTimeOfDay: 'Afternoon'
      },
      {
        name: 'Paradise Beach (Full Moon Beach)',
        description: 'Secluded secluded cove accessible only by foot trail or fishing boat, free of road vehicles.',
        category: 'Untouched Beach',
        suggestedDuration: '3 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Mahabaleshwar Temple & Kotitirtha',
        description: '4th-century classical Dravidian granite temple housing the Atmalinga of Lord Shiva by the holy pond.',
        category: 'Heritage & Spiritual',
        suggestedDuration: '1.5 hours',
        entryFee: 'Free entry',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Kudle Beach Sunset Viewpoint',
        description: 'Wide crescent cove fringed by coconut groves with beachfront cafes and sunset yoga.',
        category: 'Beach & Sunset',
        suggestedDuration: '2 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Evening'
      }
    ],
    recommendedActivities: [
      'The 5-Beach Cliff Trek from Kudle to Paradise Beach across scenic headlands',
      'Morning yoga on the sands of Kudle beach',
      'Night bioluminescence kayaking in season when plankton lights the surf',
      'Dolphin watching boat ride with local fishermen'
    ],
    localFoods: [
      {
        name: 'Fresh Catch Kane (Ladyfish) Rava Fry',
        description: 'Semolina-crusted coastal fish fried crisp with spicy red masala and lemon.',
        isVeg: false,
        mustTrySpot: 'Namaste Cafe, Om Beach'
      },
      {
        name: 'Nutella Banana Wood-Fired Pancake',
        description: 'Backpacker staple served at cliffside bohemian cafes overlooking the waves.',
        isVeg: true,
        mustTrySpot: 'Mantra Cafe, Kudle Beach'
      },
      {
        name: 'South Indian Filter Coffee & Neer Dosa',
        description: 'Feather-light delicate rice crepes with fresh coconut chutney.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Kudle Beach Cliffside',
        description: 'Bohemian cliff cottages and beachfront hostels overlooking the bay.',
        vibe: 'Relaxed & Beachfront',
        priceRange: '₹1,200 - ₹4,500/night'
      },
      {
        name: 'Gokarna Town & Main Beach',
        description: 'Traditional heritage guesthouses close to temples and markets.',
        vibe: 'Cultural & Budget',
        priceRange: '₹900 - ₹3,000/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Goa Dabolim Airport (GOI) - 140 km, or Mangalore (IXE) - 230 km',
      nearestRailway: 'Gokarna Road Railway Station (GOK) - 8 km (on Konkan Railway line)',
      roadAccess: 'Smooth NH66 highway connects Gokarna to Bangalore (approx. 8 hours) and Goa (approx. 3.5 hours)'
    },
    travelTips: [
      'Take care on the rocky cliff trails after dark; carry a charged flashlight or phone torch.',
      'Paradise Beach is a plastic-free zone; respect the signboards and leave zero waste behind.',
      'Auto-rickshaws have fixed rate boards displayed near the town bus stand.'
    ],
    nearbyDestinations: ['Dandeli', 'Murudeshwar', 'Goa', 'Yana Rocks'],
    rating: 4.7,
    reviewCount: 1670
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur',
    state: 'Karnataka',
    region: 'South India',
    shortDescription: 'The birthplace of Indian coffee, featuring rugged Western Ghats summits and forest trails.',
    overview: 'Surrounded by the highest peaks of Karnataka including Mullayanagiri and Baba Budangiri, Chikmagalur is a paradise of high-altitude coffee plantations, cascading forest waterfalls like Hebbe and Jhari, and cool mountain weather.',
    image: DESTINATION_IMAGES['chikmagalur'].primary,
    fallbackImage: DESTINATION_IMAGES['chikmagalur'].fallback,
    gallery: DESTINATION_IMAGES['chikmagalur'].gallery,
    categories: ['Mountains', 'Nature', 'Weekend', 'Adventure', 'Budget'],
    indicativeBudgetPerPerson: 6800,
    suggestedDurationDays: 3,
    bestSeason: 'September to March (Crisp mountain air & green coffee berry harvest)',
    idealWeatherMood: 'Cool',
    weather: {
      avgTempMin: 14,
      avgTempMax: 25,
      condition: 'Crisp Mountain Breeze & Floating Clouds',
      rainfallChance: 14,
      bestMonths: ['October', 'November', 'December', 'January', 'February'],
      climateSummary: 'Highland tropical climate with mild weather all year round. Winters are delightfully crisp and sunny.',
      packingTips: ['Windbreaker or warm fleece jacket for high peaks', 'Good grip hiking boots', 'Sunglasses & camera with zoom lens']
    },
    topAttractions: [
      {
        name: 'Mullayanagiri Peak',
        description: 'Highest peak in Karnataka offering breathtaking 360-degree vistas across Western Ghat ridges.',
        category: 'Trekking & Mountain Peak',
        suggestedDuration: '3 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Baba Budangiri & Manikyadhara Falls',
        description: 'Sacred mountain range associated with Sufi saint Baba Budan with scenic cascading waters.',
        category: 'Heritage & Nature',
        suggestedDuration: '2.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Hebbe Falls in Kemmanagundi',
        description: 'Exotic two-stage waterfall cascading inside a private coffee estate reachable by forest 4x4.',
        category: 'Waterfalls & Forest',
        suggestedDuration: '3.5 hours',
        entryFee: '₹70 (Jeep safari extra)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Coffee Yatra Museum',
        description: 'Interactive exhibition of India’s coffee history, roasting techniques, and bean varieties.',
        category: 'Culture & Museum',
        suggestedDuration: '1.5 hours',
        entryFee: '₹50',
        bestTimeOfDay: 'Afternoon'
      }
    ],
    recommendedActivities: [
      'Climb the 500 stone steps to Mullayanagiri temple at sunrise',
      'Jeep off-roading through rugged forest terrain to Jhari Buttermilk Falls',
      'Estate tour learning the nuances of Arabica vs Robusta hand-harvesting',
      'Campfire evening with fresh Malnad delicacies at a local homestay'
    ],
    localFoods: [
      {
        name: 'Malnad Halasina Hannu (Jackfruit) Dishes',
        description: 'Traditional seasonal jackfruit papad, curry, and steamed rice cake (kadabu).',
        isVeg: true,
        mustTrySpot: 'Town Canteen, Chikmagalur'
      },
      {
        name: 'Benne Dosa with Coconut Chutney',
        description: 'Thick butter dosa made with pure country butter and red chili masala.',
        isVeg: true,
        mustTrySpot: 'Town Canteen, Rathnagiri Road'
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Mullayanagiri Road / Tarikere Hills',
        description: 'Perched high in the clouds with panoramic ridge balconies.',
        vibe: 'Secluded Nature',
        priceRange: '₹3,000 - ₹8,500/night'
      },
      {
        name: 'Chikmagalur Town & Bypass',
        description: 'Close to main market, restaurants, and central transport.',
        vibe: 'Accessible & Value',
        priceRange: '₹1,500 - ₹4,500/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Mangalore International (IXE) - 150 km, or Bengaluru (BLR) - 260 km',
      nearestRailway: 'Chikmagalur Railway Station (CKM) or Kadur Junction (DRU) - 40 km',
      roadAccess: 'Excellent highway from Bengaluru via Hassan (approx. 4.5 hours drive)'
    },
    travelTips: [
      'Start for Mullayanagiri before 7 AM on weekends to avoid vehicle bottleneck jams along the narrow summit pass.',
      'Visit local coffee curers to buy freshly roasted custom-blend Arabica beans.',
      'Check entry timings for Kemmanagundi jeep safaris as forest gates close by 4:30 PM.'
    ],
    nearbyDestinations: ['Belur', 'Halebidu', 'Coorg', 'Kudremukh'],
    rating: 4.7,
    reviewCount: 1540
  },
  {
    id: 'wayanad',
    name: 'Wayanad',
    state: 'Kerala',
    region: 'South India',
    shortDescription: 'Misty mountain forests, Neolithic rock engravings, wildlife sanctuaries, and spice estates.',
    overview: 'Set amidst Kerala’s Nilgiri biosphere reserve, Wayanad offers ancient mysteries at Edakkal Caves, heart-shaped lakes atop Chembra Peak, bamboo rafting on Kuruva Island, and wild elephant sightings in Tholpetty.',
    image: DESTINATION_IMAGES['wayanad'].primary,
    fallbackImage: DESTINATION_IMAGES['wayanad'].fallback,
    gallery: DESTINATION_IMAGES['wayanad'].gallery,
    categories: ['Nature', 'Adventure', 'Family-friendly', 'Mountains', 'Weekend'],
    indicativeBudgetPerPerson: 7100,
    suggestedDurationDays: 3,
    bestSeason: 'October to May (Lush green hills and comfortable sunshine)',
    idealWeatherMood: 'Cool',
    weather: {
      avgTempMin: 17,
      avgTempMax: 27,
      condition: 'Crisp Green Forest Breezes & Mild Days',
      rainfallChance: 12,
      bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
      climateSummary: 'Equable highland climate with cool evenings and pleasant forest breezes. Lush vegetation year-round.',
      packingTips: ['Comfortable trekking shoes', 'Raincoat or compact umbrella', 'Mosquito repellent for forest trails']
    },
    topAttractions: [
      {
        name: 'Edakkal Prehistoric Caves',
        description: 'Neolithic rock shelters perched at 1,200m featuring petroglyphs dating back 6,000 BCE.',
        category: 'Archaeology & Trekking',
        suggestedDuration: '2.5 hours',
        entryFee: '₹50',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Banasura Sagar Dam',
        description: 'Largest earthen dam in India set amidst tranquil islands and lush mountain peaks with speedboating.',
        category: 'Lake & Dam',
        suggestedDuration: '2 hours',
        entryFee: '₹50 (Speedboating ₹750/boat)',
        bestTimeOfDay: 'Afternoon'
      },
      {
        name: 'Soochipara (Sentinel Rock) Waterfalls',
        description: 'Dramatic three-tiered waterfall cascading into a natural pool surrounded by dense deciduous forest.',
        category: 'Waterfalls & Hiking',
        suggestedDuration: '2.5 hours',
        entryFee: '₹80',
        bestTimeOfDay: 'Morning'
      }
    ],
    recommendedActivities: [
      'Bamboo rafting along the tranquil Kuruva Dweep river island',
      'Staying in a traditional Kerala eco-treehouse overlooking canopy birds',
      'Jeep safari through Tholpetty Wildlife Sanctuary to spot wild elephants',
      'Spice plantation tour smelling fresh green cardamom, pepper, and cloves'
    ],
    localFoods: [
      {
        name: 'Wayanadan Kajeera Rice with Kozhi Roast',
        description: 'Locally grown scented Gandhakasala short-grain rice served with slow-roasted country chicken.',
        isVeg: false,
        mustTrySpot: '1980’s A Nostalgic Restaurant, Kalpetta'
      },
      {
        name: 'Puttu and Kadala Curry',
        description: 'Steamed rice cylinders with layered coconut paired with roasted black chickpea curry.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Vythiri / Lakkidi',
        description: 'High mist pass with luxury rainforest resorts, treehouses, and cooler temperatures.',
        vibe: 'Romantic & Secluded',
        priceRange: '₹3,500 - ₹12,000/night'
      },
      {
        name: 'Kalpetta / Sultan Bathery',
        description: 'Central hub close to markets, restaurants, and easy transport.',
        vibe: 'Convenient & Budget',
        priceRange: '₹1,500 - ₹4,500/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Calicut International Airport (CCJ) - 85 km (approx. 2.5 hours scenic Thamarassery ghat drive)',
      nearestRailway: 'Kozhikode Railway Station (CLT) - 72 km',
      roadAccess: 'Connected to Bengaluru via Mysore & Bandipur National Park (approx. 6 hours)'
    },
    travelTips: [
      'Bandipur/Muthanga forest checkpost closes for night traffic from 9 PM to 6 AM; plan driving times accordingly.',
      'Edakkal Caves require a moderately steep 1-km uphill climb; visit in the early morning before midday heat.',
      'Buy authentic Gandhakasala aromatic rice and pure forest honey from Uravu bamboo co-operative.'
    ],
    nearbyDestinations: ['Coorg', 'Ooty', 'Kozhikode', 'Kannur'],
    rating: 4.7,
    reviewCount: 1620
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    state: 'Tamil Nadu',
    region: 'South India',
    shortDescription: 'Queen of the Nilgiri Hill Stations with heritage mountain railways, botanical gardens, and pine lakes.',
    overview: 'Nestled in the blue Nilgiri Mountains, Ooty offers historic colonial charm, the UNESCO Nilgiri Mountain Railway toy train, aromatic eucalyptus groves, lush tea factories, and panoramic views from Doddabetta Peak.',
    image: DESTINATION_IMAGES['ooty'].primary,
    fallbackImage: DESTINATION_IMAGES['ooty'].fallback,
    gallery: DESTINATION_IMAGES['ooty'].gallery,
    categories: ['Mountains', 'Family-friendly', 'Romantic', 'Weekend', 'Nature'],
    indicativeBudgetPerPerson: 7400,
    suggestedDurationDays: 3,
    bestSeason: 'October to May (Cool sunny days & pleasant nights)',
    idealWeatherMood: 'Cool',
    weather: {
      avgTempMin: 9,
      avgTempMax: 20,
      condition: 'Crisp Mountain Chill & Eucalyptus Scented Air',
      rainfallChance: 10,
      bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
      climateSummary: 'Subtropical highland climate. Winter nights can drop to near-freezing (4-7°C), while afternoons are sunny and cool.',
      packingTips: ['Warm winter jacket, scarf, and woolen cap', 'Comfortable walking shoes', 'Moisturizer & sunscreen']
    },
    topAttractions: [
      {
        name: 'Nilgiri Mountain Railway Toy Train',
        description: 'UNESCO World Heritage rack-and-pinion steam train chugging through 16 tunnels and 250 bridges.',
        category: 'Heritage Railway',
        suggestedDuration: '3.5 hours',
        entryFee: '₹200 - ₹450 (IRCTC booking)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Doddabetta Peak Viewpoint',
        description: 'Highest mountain in the Nilgiris at 2,637m with an observatory telescope dome.',
        category: 'Mountain Peak',
        suggestedDuration: '2 hours',
        entryFee: '₹10 (plus camera fee)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Pykara Lake & Waterfalls',
        description: 'Pristine highland lake flanked by pine slopes with eco-friendly motorboat rides.',
        category: 'Lake & Boating',
        suggestedDuration: '2.5 hours',
        entryFee: '₹20 (Boating extra)',
        bestTimeOfDay: 'Afternoon'
      }
    ],
    recommendedActivities: [
      'Heritage steam ride from Mettupalayam or Coonoor to Ooty',
      'Cycling through the pine forests around Avalanche Lake',
      'Handmade chocolate tasting in local artisanal bakeries',
      'Visiting a traditional Toda tribal hamlet with arched thatch roofs'
    ],
    localFoods: [
      {
        name: 'Handcrafted Nilgiri Dark Chocolate & Fudge',
        description: 'Rich artisanal chocolates made with pure cocoa butter and roasted nuts.',
        isVeg: true,
        mustTrySpot: 'King Star Confectionery, Commercial Road'
      },
      {
        name: 'Varkey with Nilgiri Tea',
        description: 'Flaky baked pastry biscuit traditional to Ooty bakers, dipped in strong local cardamom tea.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Upper Bhavani / Fern Hill',
        description: 'Colonial heritage bungalows and garden cottages with quiet valley views.',
        vibe: 'Colonial & Peaceful',
        priceRange: '₹3,500 - ₹10,000/night'
      },
      {
        name: 'Ooty Lake / Charing Cross',
        description: 'Walking distance to markets, bus stand, and toy train station.',
        vibe: 'Central & Vibrant',
        priceRange: '₹1,600 - ₹4,800/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Coimbatore International Airport (CJB) - 88 km (approx. 3 hours scenic ghat drive)',
      nearestRailway: 'Mettupalayam (MTP) - 51 km (Toy train connects to Ooty) or Coimbatore Junction (CBE)',
      roadAccess: 'Accessible via 36 hairpin bends of the Kalhatty ghat road or Coonoor highway'
    },
    travelTips: [
      'Book Nilgiri Mountain Toy Train tickets 60–90 days in advance via IRCTC as tickets sell out rapidly.',
      'Avalanche Lake requires a prior forest department eco-safari pass obtained at the entrance.',
      'Carry warm clothing even during summer months as temperatures drop rapidly after sunset.'
    ],
    nearbyDestinations: ['Coonoor', 'Kotagiri', 'Mudumalai', 'Wayanad'],
    rating: 4.6,
    reviewCount: 2210
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry (Puducherry)',
    state: 'Tamil Nadu',
    region: 'South India',
    shortDescription: 'French colonial quarters with pastel yellow villas, tranquil beaches, and experimental township culture.',
    overview: 'A coastal retreat blending French heritage with Tamil culture. Stroll through the cobblestone streets of White Town lined with bougainvillea, cycle along the Seaside Promenade, and find mindfulness at Auroville.',
    image: DESTINATION_IMAGES['pondicherry'].primary,
    fallbackImage: DESTINATION_IMAGES['pondicherry'].fallback,
    gallery: DESTINATION_IMAGES['pondicherry'].gallery,
    categories: ['Romantic', 'Food & Culture', 'Relaxation', 'Weekend', 'Beaches'],
    indicativeBudgetPerPerson: 6500,
    suggestedDurationDays: 3,
    bestSeason: 'October to March (Gentle sea breeze & warm sunny days)',
    idealWeatherMood: 'Pleasant',
    weather: {
      avgTempMin: 22,
      avgTempMax: 30,
      condition: 'Sunny Coastal Breezes & Gentle Surf',
      rainfallChance: 12,
      bestMonths: ['November', 'December', 'January', 'February'],
      climateSummary: 'Tropical coastal climate. Winter months are pleasant and dry with soft evening sea breezes.',
      packingTips: ['Breathable linen dresses & light cottons', 'Comfortable slip-on shoes for cycling', 'Sun hat & sunscreen']
    },
    topAttractions: [
      {
        name: 'White Town (French Quarter) Heritage Walk',
        description: 'Colonial streets with French street signs, arched windows, and vibrant cafes.',
        category: 'Heritage & Architecture',
        suggestedDuration: '2 hours',
        entryFee: 'Free walk',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Auroville & Matrimandir',
        description: 'Experimental international township dedicated to human unity with a golden spherical meditation dome.',
        category: 'Spiritual & Universal Community',
        suggestedDuration: '3.5 hours',
        entryFee: 'Free (Matrimandir inside viewing requires prior online booking)',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Promenade Beach & Rock Beach',
        description: '1.5-km pedestrian promenade closed to motor traffic every evening with Gandhi statue.',
        category: 'Coastal Promenade',
        suggestedDuration: '2 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Evening'
      }
    ],
    recommendedActivities: [
      'Renting a vintage bicycle to explore French and Tamil quarters',
      'Surfing lessons on the gentle beach break at Serenity Beach',
      'French bakery hopping for authentic butter croissants and baguettes',
      'Meditation at Sri Aurobindo Ashram courtyards'
    ],
    localFoods: [
      {
        name: 'Butter Croissant & Cafe Au Lait',
        description: 'Freshly baked flaky French pastry with aromatic espresso and steamed milk.',
        isVeg: true,
        mustTrySpot: 'Baker Street, Bussy Street'
      },
      {
        name: 'Creole Prawn Curry',
        description: 'Unique Franco-Tamil fusion curry cooked with coconut milk, tamarind, and French herbs.',
        isVeg: false,
        mustTrySpot: 'Carte Blanche, Hotel de l’Orient'
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'White Town',
        description: 'Restored 18th-century French villas turned boutique hotels steps from the seaside.',
        vibe: 'Colonial & Romantic',
        priceRange: '₹3,000 - ₹9,000/night'
      },
      {
        name: 'Auroville Rural / Kottakuppam',
        description: 'Quiet eco-guesthouses, organic farms, and artistic communities.',
        vibe: 'Eco & Peaceful',
        priceRange: '₹1,500 - ₹4,500/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Chennai International Airport (MAA) - 135 km (approx. 2.5 hours via scenic East Coast Road)',
      nearestRailway: 'Puducherry Railway Station (PDY) or Villupuram Junction (VM) - 37 km',
      roadAccess: 'The East Coast Road (ECR) from Chennai is one of India’s most scenic coastal drives'
    },
    travelTips: [
      'Promenade beach road is entirely vehicle-free every day from 6 PM to 7:30 AM; perfect for safe evening strolls.',
      'Book Matrimandir viewing at Auroville Visitors Centre at least 2–3 days in advance.',
      'Try visiting on weekdays to enjoy peaceful White Town streets without weekend tourist crowds.'
    ],
    nearbyDestinations: ['Mahabalipuram', 'Chennai', 'Thanjavur', 'Pichavaram'],
    rating: 4.7,
    reviewCount: 2040
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North India',
    shortDescription: 'Yoga capital of the world and adrenaline hub along the sacred, emerald green Ganges River.',
    overview: 'Where the holy Ganges rushes out of the Himalayas into the plains. Rishikesh balances spiritual serene evening Ganga aartis at Parmarth Niketan with white-water river rafting, bungee jumping, and cliff camping.',
    image: DESTINATION_IMAGES['rishikesh'].primary,
    fallbackImage: DESTINATION_IMAGES['rishikesh'].fallback,
    gallery: DESTINATION_IMAGES['rishikesh'].gallery,
    categories: ['Adventure', 'Nature', 'Historical', 'Backpacking', 'Budget'],
    indicativeBudgetPerPerson: 5900,
    suggestedDurationDays: 3,
    bestSeason: 'September to May (Pleasant river conditions & warm days)',
    idealWeatherMood: 'Pleasant',
    weather: {
      avgTempMin: 13,
      avgTempMax: 27,
      condition: 'Sunny Himalayan Breezes & Fresh Mountain Waters',
      rainfallChance: 6,
      bestMonths: ['October', 'November', 'February', 'March', 'April', 'May'],
      climateSummary: 'Subtropical highland climate. Waters are crystal-emerald during winter and spring.',
      packingTips: ['Quick-dry shorts and water shoes for rafting', 'Modest clothing for ashram visits', 'Light fleece for evenings']
    },
    topAttractions: [
      {
        name: 'Ganga Whitewater Rafting (Shivpuri to Marine Drive)',
        description: 'Exciting Grade III and IV rapids like Roller Coaster, Golf Course, and Club House.',
        category: 'Adventure Sports',
        suggestedDuration: '3 hours',
        entryFee: '₹600 - ₹1,200 per person',
        bestTimeOfDay: 'Morning'
      },
      {
        name: 'Parmarth Niketan Ganga Aarti',
        description: 'Soulful sunset prayer ceremony on the riverbanks with Vedic chants, bells, and floating lamps.',
        category: 'Spiritual Ceremony',
        suggestedDuration: '1.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Evening'
      },
      {
        name: 'Beatles Ashram (Chaurasi Kutia)',
        description: 'Forest ashram where The Beatles composed the White Album in 1968, featuring graffiti murals and meditation domes.',
        category: 'Heritage & Music Culture',
        suggestedDuration: '2 hours',
        entryFee: '₹150 (Indians) / ₹600 (Foreigners)',
        bestTimeOfDay: 'Morning'
      }
    ],
    recommendedActivities: [
      'Ganga whitewater rafting through exhilarating rapids with certified safety guides',
      'Sunrise hike to Kunjapuri Devi temple for Himalayan snow peak views',
      'Drop-in yoga and singing bowl sound healing session in Tapovan',
      'Riverside beach camping under starlit Himalayan skies'
    ],
    localFoods: [
      {
        name: 'Ayurvedic Thali & Herbal Teas',
        description: 'Nutritious satvik organic meals prepared with seasonal greens, dal, and fresh rotis.',
        isVeg: true,
        mustTrySpot: 'Little Buddha Cafe, Laxman Jhula'
      },
      {
        name: 'Aloo Puri & Kachori',
        description: 'Crispy fried flatbreads with tangy potato gravy and mango pickle served at holy ghats.',
        isVeg: true
      }
    ],
    suggestedAccommodationAreas: [
      {
        name: 'Tapovan / Laxman Jhula',
        description: 'Backpacker haven with bohemian cafes, yoga studios, and guesthouses.',
        vibe: 'Lively & Spiritual',
        priceRange: '₹1,000 - ₹4,000/night'
      },
      {
        name: 'Shivpuri / Marine Drive',
        description: 'Luxury eco-camps and resorts along the pristine riverside.',
        vibe: 'Adventure & Scenic',
        priceRange: '₹2,500 - ₹8,500/night'
      }
    ],
    transportGuidance: {
      nearestAirport: 'Dehradun Jolly Grant Airport (DED) - 20 km (approx. 35 mins drive)',
      nearestRailway: 'Yog Nagari Rishikesh (YNRK) or Haridwar Junction (HW) - 25 km',
      roadAccess: 'Smooth expressway connected from New Delhi in approx. 4.5 hours'
    },
    travelTips: [
      'Rishikesh is an alcohol-free and strictly vegetarian holy town; respect local customs and regulations.',
      'Only book river rafting with government-licensed operators that provide lifejackets and helmets.',
      'Cross the pedestrian suspension bridges on foot; watch out for mischievous local monkeys!'
    ],
    nearbyDestinations: ['Haridwar', 'Mussoorie', 'Dehradun', 'Chopta'],
    rating: 4.8,
    reviewCount: 2950
  }
];

export const TRAVEL_MOODS = [
  { id: 'Beaches', title: 'Sun & Coastal', count: '18 Escapes', image: TRAVEL_MOOD_IMAGES.Beaches.primary, fallbackImage: TRAVEL_MOOD_IMAGES.Beaches.fallback },
  { id: 'Mountains', title: 'Mountain Peaks', count: '24 Retreats', image: TRAVEL_MOOD_IMAGES.Mountains.primary, fallbackImage: TRAVEL_MOOD_IMAGES.Mountains.fallback },
  { id: 'Historical', title: 'Heritage & Forts', count: '15 Wonders', image: TRAVEL_MOOD_IMAGES.Historical.primary, fallbackImage: TRAVEL_MOOD_IMAGES.Historical.fallback },
  { id: 'Nature', title: 'Forests & Falls', count: '21 Sanctuaries', image: TRAVEL_MOOD_IMAGES.Nature.primary, fallbackImage: TRAVEL_MOOD_IMAGES.Nature.fallback },
  { id: 'Adventure', title: 'Thrill & Treks', count: '14 Trails', image: TRAVEL_MOOD_IMAGES.Adventure.primary, fallbackImage: TRAVEL_MOOD_IMAGES.Adventure.fallback },
  { id: 'Weekend', title: 'Quick Getaways', count: '19 Breaks', image: TRAVEL_MOOD_IMAGES.Weekend.primary, fallbackImage: TRAVEL_MOOD_IMAGES.Weekend.fallback }
];
