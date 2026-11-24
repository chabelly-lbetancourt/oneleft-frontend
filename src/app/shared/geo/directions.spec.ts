import { geoUri, osmDirectionsUrl } from './directions';

const POINT = { name: 'Pistas (Albufera)', latitude: 40.396, longitude: -3.63 };

describe('directions', () => {
  it('should build a geo: URI with the meeting point and its name as the label', () => {
    expect(geoUri(POINT)).toBe('geo:40.396,-3.63?q=40.396,-3.63(Pistas%20Albufera)');
  });

  it('should open the walking or cycling directions of openstreetmap.org, with the start only when known', () => {
    const walking = new URL(osmDirectionsUrl(POINT, 'foot'));
    expect(walking.origin + walking.pathname).toBe('https://www.openstreetmap.org/directions');
    expect(walking.searchParams.get('engine')).toBe('fossgis_osrm_foot');
    expect(walking.searchParams.get('route')).toBe(';40.396,-3.63');

    const cycling = new URL(osmDirectionsUrl(POINT, 'bike', { latitude: 40.39, longitude: -3.62 }));
    expect(cycling.searchParams.get('engine')).toBe('fossgis_osrm_bike');
    expect(cycling.searchParams.get('route')).toBe('40.39,-3.62;40.396,-3.63');
  });
});
