
export interface Destination {
  id: string;
  city: string;
  country: string;
  vibe: string;
  weather: {
    temp: number;
    condition: string;
  };
  priceEstimate: number;
  description: string;
  topAttractions: string[];
  imageUrl: string;
}

export interface SearchCriteria {
  budget: number;
  vibe: string;
  origin: string;
}

export enum TravelVibe {
  TROPICAL = 'Tropical',
  SNOWY = 'Snowy',
  URBAN = 'Urban/City',
  NATURE = 'Nature/Mountains',
  HISTORIC = 'Historic/Cultural',
  ADVENTURE = 'Adventure',
}
