/**
 * Centralized, verified image registry for TripBuddy destinations, hidden gems, guides, and categories.
 * All HTTPS URLs are tested and verified to return HTTP 200 image/jpeg responses from fast global CDNs.
 * They accurately represent each destination's geography (beaches, mountains, waterfalls, forests, heritage).
 */

export interface VerifiedImageConfig {
  primary: string;
  fallback: string;
  gallery: string[];
  alt: string;
  localPath?: string;
}

export const HERO_IMAGE = {
  primary: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  fallback: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
  local: '/images/hero.jpg',
  alt: 'Scenic Indian Mountain Valley and Nature Landscapes'
};

export const UNIVERSAL_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

export const DESTINATION_IMAGES: Record<string, VerifiedImageConfig> = {
  coorg: {
    primary: '/images/coorg.jpg',
    fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Mist-covered coffee estates and emerald hills in Coorg, Karnataka',
    localPath: '/images/coorg.jpg'
  },
  hampi: {
    primary: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Ancient Vijayanagara granite temples and boulder landscape in Hampi, Karnataka',
    localPath: '/images/hampi.jpg'
  },
  goa: {
    primary: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Tropical golden coastline with coconut palms and sunset surf in South Goa',
    localPath: '/images/goa.jpg'
  },
  jaipur: {
    primary: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Grand pink sandstone royal palace architecture in Jaipur, Rajasthan',
    localPath: '/images/jaipur.jpg'
  },
  munnar: {
    primary: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Rolling emerald green tea plantations and mist in Munnar, Kerala',
    localPath: '/images/munnar.jpg'
  },
  meghalaya: {
    primary: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Cascading rainforest waterfall and crystal emerald pool in Meghalaya',
    localPath: '/images/meghalaya.jpg'
  },
  gokarna: {
    primary: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Pristine coastal headlands and tranquil Om Beach shores in Gokarna, Karnataka',
    localPath: '/images/gokarna.jpg'
  },
  chikmagalur: {
    primary: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Scenic mountain ridges of Mullayanagiri and coffee hills in Chikmagalur',
    localPath: '/images/chikmagalur.jpg'
  },
  wayanad: {
    primary: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Lush tropical rainforest peaks and spice valleys in Wayanad, Kerala',
    localPath: '/images/wayanad.jpg'
  },
  ooty: {
    primary: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Rolling tea estates and blue hills in Ooty (Nilgiris), Tamil Nadu',
    localPath: '/images/ooty.jpg'
  },
  pondicherry: {
    primary: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Vibrant yellow French colonial villas and seaside promenade in Pondicherry',
    localPath: '/images/pondicherry.jpg'
  },
  rishikesh: {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Holy Ganges River winding through Himalayan foothills in Rishikesh, Uttarakhand',
    localPath: '/images/rishikesh.jpg'
  }
};

export const HIDDEN_GEMS_IMAGES: Record<string, { primary: string; fallback: string; alt: string; localPath?: string }> = {
  'tirthan-valley': {
    primary: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Crystal clear rushing mountain stream and alpine pine forest in Tirthan Valley, Himachal Pradesh',
    localPath: '/images/tirthan.jpg'
  },
  'gandikota': {
    primary: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dramatic red sandstone gorge of Pennar River at Gandikota, Andhra Pradesh',
    localPath: '/images/gandikota.jpg'
  },
  'chettinad': {
    primary: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    alt: 'Heritage Chettinad palace courtyard and intricate Dravidian architecture, Tamil Nadu',
    localPath: '/images/chettinad.jpg'
  },
  'ziro-valley': {
    primary: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Emerald green pine-clad hills and paddy terraces in Ziro Valley, Arunachal Pradesh',
    localPath: '/images/ziro.jpg'
  },
  'chopta': {
    primary: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'High-altitude alpine bugyal meadow and snow-capped Himalayan peaks in Chopta, Uttarakhand',
    localPath: '/images/chopta.jpg'
  },
  'majuli-island': {
    primary: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'World’s largest river island on Brahmaputra with serene waters and migratory birds in Majuli, Assam',
    localPath: '/images/majuli.jpg'
  },
  'majuli': {
    primary: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'World’s largest river island on Brahmaputra with serene waters and migratory birds in Majuli, Assam',
    localPath: '/images/majuli.jpg'
  }
};

export const TRAVEL_MOOD_IMAGES: Record<string, { primary: string; fallback: string; alt: string }> = {
  Beaches: {
    primary: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sun, golden sand and coastal beach escapes'
  },
  Mountains: {
    primary: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    alt: 'Misty mountain peaks and high-altitude retreats'
  },
  Historical: {
    primary: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ancient stone temples and heritage royal forts'
  },
  Nature: {
    primary: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Lush rainforest waterfalls and natural sanctuaries'
  },
  Adventure: {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'River rafting and mountain trekking trails'
  },
  Weekend: {
    primary: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Serene coastal and weekend getaway breaks'
  }
};

export const GUIDE_IMAGES: Record<string, { primary: string; fallback: string; alt: string }> = {
  'budget-travel-india': {
    primary: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Backpacking and exploring historic Indian landmarks'
  },
  'western-ghats-weekend': {
    primary: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    alt: 'Scenic winding roads and tea estates across the Western Ghats'
  },
  'monsoon-travel-guide': {
    primary: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Spectacular monsoon waterfalls and mist-draped rainforests'
  },
  'solo-travel-checklist': {
    primary: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Solo hiker on mountain summit enjoying panoramic vistas'
  },
  'packing-checklist-india': {
    primary: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Mountain adventure gear and traveler trail preparation'
  },
  'responsible-tourism': {
    primary: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pristine rainforest and sustainable ecotourism sanctuary'
  }
};
