export function createItineraryPrompt(form) {
  const { title, destination, start_date, end_date, num_travelers, budget, travel_style, interests } = form;
  const days = getTripDays(start_date, end_date);
  return `Create a detailed travel itinerary for the following trip:\n
Title: ${title}\nDestination: ${destination}\nDates: ${start_date || 'TBD'} - ${end_date || 'TBD'}\nDuration: ${days} day${days > 1 ? 's' : ''}\nTravelers: ${num_travelers}\nBudget: ${budget}\nStyle: ${travel_style}\nInterests: ${interests || 'General travel'}\n\nGive a day-by-day plan with highlights, morning/afternoon/evening activities, and a short overview of local culture and recommended food.`;
}

export function getTripDays(start, end) {
  if (!start || !end) return 3;
  const s = new Date(start);
  const e = new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || e <= s) return 3;
  const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, diff);
}

export function generateFallbackItinerary(form) {
  const { title, destination, start_date, end_date, num_travelers, budget, travel_style, interests } = form;
  const days = getTripDays(start_date, end_date);
  const activities = [
    'Explore local landmarks',
    'Try traditional cuisine',
    'Visit a popular cultural site',
    'Relax at a scenic spot',
    'Shop local markets',
  ];

  let itinerary = `Recommended itinerary for ${title} (${destination}).\n`;
  itinerary += `Trip length: ${days} day${days > 1 ? 's' : ''}. Budget: ${budget}. Style: ${travel_style}.\n`;
  if (interests) itinerary += `Interests: ${interests}.\n`;

  for (let day = 1; day <= days; day++) {
    const activity = activities[(day - 1) % activities.length];
    itinerary += `\nDay ${day}:\n`;
    itinerary += `- Morning: ${activity} with local guidance.\n`;
    itinerary += `- Afternoon: Enjoy local food and explore neighborhoods.\n`;
    itinerary += `- Evening: Attend a cultural event or relax at a recommended spot.\n`;
  }

  itinerary += `\nEnjoy your trip to ${destination}!`;
  return itinerary;
}

export async function generateAIItinerary(form) {
  const endpoint = import.meta.env.VITE_AI_ENDPOINT;
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (endpoint) {
    try {
      const payload = {
        prompt: createItineraryPrompt(form),
        max_tokens: 500,
        temperature: 0.7,
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data === 'string') {
          return data;
        }
        if (data.text) {
          return data.text;
        }
        if (data.choices?.[0]?.text) {
          return data.choices[0].text.trim();
        }
        if (data.itinerary) {
          return data.itinerary;
        }
      } else {
        console.error('AI endpoint responded with status', res.status);
      }
    } catch (error) {
      console.error('AI itinerary generation error:', error);
    }
  }

  return generateFallbackItinerary(form);
}
