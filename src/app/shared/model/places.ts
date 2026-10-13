/** A place suggested for the meeting point (HU-071), with its distance to the device. */
export interface PlaceSuggestion {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceMeters: number;
}

/** From this many characters the meeting point suggests places, the same as the service asks. */
export const PLACE_QUERY_MIN_LENGTH = 3;
