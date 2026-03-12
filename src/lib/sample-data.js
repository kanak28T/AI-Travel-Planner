export const sampleTrips = [
  { id: '1', title: 'Golden Triangle Adventure', destination: 'Delhi, Agra, Jaipur', start_date: '2025-12-05', end_date: '2025-12-12', estimated_cost: 18000, status: 'upcoming', details: 'Includes Taj Mahal, Amer Fort, and local bazaar tours.' },
  { id: '2', title: 'Kerala Backwaters Escape', destination: 'Alleppey', start_date: '2025-11-15', end_date: '2025-11-20', estimated_cost: 12000, status: 'planning', details: 'Houseboat cruise and tea gardens.' },
  { id: '3', title: 'Goa Beach Chill', destination: 'North Goa', start_date: '2025-12-20', end_date: '2025-12-27', estimated_cost: 8500, status: 'planning', details: 'Beach sports, local seafood, and sunset cruises.' },
  { id: '4', title: 'Varanasi Spiritual Journey', destination: 'Varanasi', start_date: '2025-10-02', end_date: '2025-10-05', estimated_cost: 6500, status: 'completed', details: 'Ganges aarti, boat ride, and temple walk.' },
];

export const sampleLocations = [
  { id: 'l1', name: 'Amber Fort', state: 'Rajasthan', latitude: 26.9855, longitude: 75.8513, airbnb_listings: JSON.stringify([{ url: 'https://www.airbnb.com/rooms/1' }]), unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1541560052-96b8f93ed3b0?w=1200']), wikipedia_content: 'Amber Fort is a popular tourist attraction in Amer, Rajasthan. [1] It is known for its artistic Hindu style elements.', wikipedia_url: 'https://en.wikipedia.org/wiki/Amber_Fort', google_maps_url: 'https://goo.gl/maps/2b3CT' },
  { id: 'l2', name: 'Munnar Tea Plantations', state: 'Kerala', latitude: 10.0889, longitude: 77.0595, airbnb_listings: JSON.stringify([{ url: 'https://www.airbnb.com/rooms/2' }]), unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1557339484-0cfbbfecf4b4?w=1200']), wikipedia_content: 'Munnar is a town in the Western Ghats mountain range in India’s Kerala state. [2]', wikipedia_url: 'https://en.wikipedia.org/wiki/Munnar', google_maps_url: 'https://goo.gl/maps/3d3TT' },
  { id: 'l3', name: 'Baga Beach', state: 'Goa', latitude: 15.5500, longitude: 73.7500, airbnb_listings: JSON.stringify([{ url: 'https://www.airbnb.com/rooms/3' }]), unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200']), wikipedia_content: 'Baga Beach is a popular beach along the coast of northern Goa. [3]', wikipedia_url: 'https://en.wikipedia.org/wiki/Baga_Beach', google_maps_url: 'https://goo.gl/maps/4e4UU' },
  { id: 'l4', name: 'Gateway of India', state: 'Maharashtra', latitude: 18.9218, longitude: 72.8347, airbnb_listings: JSON.stringify([{ url: 'https://www.airbnb.com/rooms/4' }]), unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1462911439546-cf39e7659aff?w=1200']), wikipedia_content: 'The Gateway of India is a historical monument in Mumbai. [4]', wikipedia_url: 'https://en.wikipedia.org/wiki/Gateway_of_India', google_maps_url: 'https://goo.gl/maps/5f5VV' },
];

export const sampleCities = [
  { id: 'c1', name: 'Jaipur', state: 'Rajasthan', description: 'The Pink City: forts, palaces, and crafts.', image: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' },
  { id: 'c2', name: 'Munnar', state: 'Kerala', description: 'Tea gardens, hills, and backwaters.', image: 'https://images.unsplash.com/photo-1577862928948-948baf7e8a72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' },
  { id: 'c3', name: 'Goa', state: 'Goa', description: 'Beaches, nightlife, and water sports.', image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' },
  { id: 'c4', name: 'Varanasi', state: 'Uttar Pradesh', description: 'Spiritual capital with the Ganges river.', image: 'https://images.unsplash.com/photo-1548069893-9b16167e5eac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' },
];
