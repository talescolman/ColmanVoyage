
import { GoogleGenAI, Type } from "@google/genai";
import { Destination, SearchCriteria } from "../types";

const client = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartSuggestions = async (criteria: SearchCriteria): Promise<Destination[]> => {
  const prompt = `
    Suggest 4-5 travel destinations for a user with the following criteria:
    - Origin: ${criteria.origin}
    - Budget: $${criteria.budget} (Total estimated trip cost for 5 days)
    - Vibe: ${criteria.vibe}

    Provide current typical weather (TEMPERATURE MUST BE IN CELSIUS) and estimated flight+hotel pricing for this month.
    
    Return the response as a JSON array of objects.
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              city: { type: Type.STRING },
              country: { type: Type.STRING },
              vibe: { type: Type.STRING },
              weather: {
                type: Type.OBJECT,
                properties: {
                  temp: { type: Type.NUMBER, description: "Temperature in Celsius" },
                  condition: { type: Type.STRING },
                },
                required: ["temp", "condition"],
              },
              priceEstimate: { type: Type.NUMBER },
              description: { type: Type.STRING },
              topAttractions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["id", "city", "country", "weather", "priceEstimate", "description", "topAttractions"],
          },
        },
      },
    });

    const suggestions: Destination[] = JSON.parse(response.text || "[]");
    
    return suggestions.map((s, idx) => ({
      ...s,
      imageUrl: [
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206',
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be'
      ][idx % 5] + '?auto=format&fit=crop&q=80&w=1200'
    }));

  } catch (error) {
    console.error("Suggestion error:", error);
    throw error;
  }
};

export const getTrendingDestinations = async (): Promise<Destination[]> => {
  const prompt = `
    Suggest 6 globally trending travel destinations for the current season.
    Provide current typical weather (TEMPERATURE MUST BE IN CELSIUS) and estimated total 5-day trip pricing.
    Return the response as a JSON array of objects following the Destination schema.
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              city: { type: Type.STRING },
              country: { type: Type.STRING },
              vibe: { type: Type.STRING },
              weather: {
                type: Type.OBJECT,
                properties: {
                  temp: { type: Type.NUMBER, description: "Temperature in Celsius" },
                  condition: { type: Type.STRING },
                },
                required: ["temp", "condition"],
              },
              priceEstimate: { type: Type.NUMBER },
              description: { type: Type.STRING },
              topAttractions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["id", "city", "country", "weather", "priceEstimate", "description", "topAttractions"],
          },
        },
      },
    });

    const trending: Destination[] = JSON.parse(response.text || "[]");
    
    return trending.map((s, idx) => ({
      ...s,
      imageUrl: [
        'https://images.unsplash.com/photo-1518391846015-55a9cc003b25',
        'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        'https://images.unsplash.com/photo-1534008897163-3ec6c0a47d21',
        'https://images.unsplash.com/photo-1548013146-72479768bbaa'
      ][idx % 6] + '?auto=format&fit=crop&q=80&w=1200'
    }));

  } catch (error) {
    console.error("Trending error:", error);
    throw error;
  }
};
