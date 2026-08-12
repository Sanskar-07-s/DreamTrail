export interface DreamIdea {
  title: string;
  category: string;
  reason: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Major';
  estimatedBudget: number;
  bestTime: string;
  suggestedLocations: string[];
}

export interface StructuredAIPlan {
  overview: string;
  bestTime: string;
  duration: string;
  estimatedBudget: number;
  currency: string;
  transportation: string[];
  accommodation: string[];
  dailyItinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    tips: string;
  }>;
  checklist: string[];
  preparation: string[];
  safety: string[];
  nearbyExperiences: string[];
}

export class MockAIProvider {
  async generateIdeas(interests: string[], budget: number, location?: string): Promise<{ ideas: DreamIdea[] }> {
    return {
      ideas: [
        {
          title: "Photograph the Milky Way in Hanle",
          category: "Photography",
          reason: `Matches your interest in ${interests.join(', ') || 'adventure'} and fits within ₹${budget.toLocaleString()} budget.`,
          difficulty: "Medium",
          estimatedBudget: Math.min(budget, 25000),
          bestTime: "May to October (New Moon nights)",
          suggestedLocations: ["Hanle, Ladakh, India", "Spiti Valley, Himachal Pradesh"]
        },
        {
          title: "Scuba Diving & Coral Reef Exploration",
          category: "Adventure",
          reason: "An unforgettable underwater journey with certified dive instructors.",
          difficulty: "Medium",
          estimatedBudget: Math.min(budget, 35000),
          bestTime: "November to April",
          suggestedLocations: ["Havelock Island, Andaman", "Netrani Island, Karnataka"]
        },
        {
          title: "Trek to Roopkund Glacial Lake",
          category: "Nature",
          reason: "High-altitude Himalayan trek through lush meadows and snow paths.",
          difficulty: "Hard",
          estimatedBudget: Math.min(budget, 18000),
          bestTime: "May - June or September - October",
          suggestedLocations: ["Uttarakhand, India"]
        }
      ]
    };
  }

  async planDream(dreamTitle: string, location?: string, budget?: number): Promise<StructuredAIPlan> {
    return {
      overview: `A complete step-by-step roadmap for "${dreamTitle}"${location ? ` in ${location}` : ''}. Designed for optimal adventure and safety.`,
      bestTime: "Autumn / Post-Monsoon (Clear skies and mild temperatures)",
      duration: "5 to 7 Days",
      estimatedBudget: budget || 30000,
      currency: "INR",
      transportation: [
        "Flight or express train to nearest major hub",
        "Local private taxi or shared 4x4 vehicle for mountain/coastal transit"
      ],
      accommodation: [
        "Boutique eco-lodges or luxury homestays for local immersion",
        "High-altitude dome tents equipped with sub-zero sleeping bags"
      ],
      dailyItinerary: [
        {
          day: 1,
          title: "Arrival & Acclimatization",
          activities: [
            "Arrive at base destination and check into accommodation.",
            "Rest, hydrate thoroughly, and take a gentle evening walk to get accustomed to local climate."
          ],
          tips: "Avoid heavy exertion on Day 1."
        },
        {
          day: 2,
          title: "Equipment Prep & Local Orientation",
          activities: [
            "Meet local guides/instructors and inspect all safety gear.",
            "Conduct preliminary trial run or photography test shoot during twilight."
          ],
          tips: "Verify camera batteries and warm layers."
        },
        {
          day: 3,
          title: "The Main Experience Journey",
          activities: [
            "Embark early in the morning toward the core dream location.",
            "Immerse in the primary activity (trek, shoot, dive, or expedition)."
          ],
          tips: "Keep essential gear easily accessible in daypack."
        },
        {
          day: 4,
          title: "Exploration & Memory Capture",
          activities: [
            "Explore hidden viewpoints and nearby cultural landmarks.",
            "Record videos, capture photos, and journal key emotional highlights."
          ],
          tips: "Respect local flora, fauna, and cultural norms."
        },
        {
          day: 5,
          title: "Celebration & Return Journey",
          activities: [
            "Final morning sunrise view.",
            "Begin journey back to home base with photos and memories stored."
          ],
          tips: "Backup photos to cloud/offline storage."
        }
      ],
      checklist: [
        "Government ID / Permits",
        "Sturdy all-terrain footwear",
        "Thermal layers & windproof jacket",
        "Personal first-aid kit & medications",
        "High-capacity power banks & spare batteries"
      ],
      preparation: [
        "Begin cardiovascular fitness routine 3 weeks prior.",
        "Check current weather advisories and local permits.",
        "Inform family/friends of detailed itinerary."
      ],
      safety: [
        "Always stay with certified local guides in remote zones.",
        "Maintain emergency contact numbers stored offline.",
        "Check local transport availability before traveling."
      ],
      nearbyExperiences: [
        "Visit local artisan villages",
        "Sample authentic regional cuisine",
        "Stargazing at night viewpoints"
      ]
    };
  }
}
