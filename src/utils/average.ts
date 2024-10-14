export const normalizeRating = (rating: number): number => {
  if (typeof rating !== "number") return 0;
  return Math.max(0, Math.min(rating, 5));
};

export const calculateAverageRating = (
  ratings: any
): number => {
  if (!ratings) return 0;
  const {
    services,
    location,
    amenities,
    prices,
    food,
    room_comfort_and_quality,
  } = ratings;

  const normalizedRatings = [
    normalizeRating(services),
    normalizeRating(location),
    normalizeRating(amenities),
    normalizeRating(prices),
    normalizeRating(food),
    normalizeRating(room_comfort_and_quality),
  ];

  const totalRatings = normalizedRatings.reduce((acc, curr) => acc + curr, 0);
  const numberOfRatings = normalizedRatings.length;

  const averageRating =
    numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
  return averageRating;
};
