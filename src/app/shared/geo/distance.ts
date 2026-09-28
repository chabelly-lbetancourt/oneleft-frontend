/** Distance for people: "450 m" under one kilometre (rounded to 10 m), "1,2 km" / "1.2 km" above. */
export const formatDistance = (meters: number, locale = 'es-ES'): string => {
  if (meters < 1000) {
    return `${Math.round(meters / 10) * 10} m`;
  }
  const km = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(meters / 1000);
  return `${km} km`;
};
