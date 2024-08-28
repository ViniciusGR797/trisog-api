interface ExperienceQueryParams {
  page?: string;
  limit?: string;
  destinationsId?: string;
  categoriesId?: string;
  date?: string;
  guests?: string;
  price?: string;
  rating?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  title?: string;
}

interface QueryFilters {
  [key: string]: any;
}

export interface QueryOptions {
  filters: QueryFilters;
  pagination: {
    page: number;
    limit: number;
  };
  sort: {
    [key: string]: "asc" | "desc";
  };
}

export function createQueryOptions(query: ExperienceQueryParams): {
  queryOptions: QueryOptions | null;
  error: string | null;
} {
  try {
    const {
      page = '1',
      limit = '10',
      destinationsId,
      categoriesId,
      date,
      guests,
      price,
      rating,
      sortBy = 'title',
      order = 'desc',
      title,
    } = query;

    const filters: QueryFilters = {};

    const pageInt = parseInt(page, 10);
    if (isNaN(pageInt) || pageInt < 1) {
      throw new Error("Invalid page value");
    }

    const limitInt = parseInt(limit, 10);
    if (isNaN(limitInt) || limitInt < 1) {
      throw new Error("Invalid limit value");
    }

    if (title) {
      filters.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (price) {
      const priceFloat = parseFloat(price);
      if (isNaN(priceFloat) || priceFloat < 0) {
        throw new Error("Invalid price value");
      }
      filters.default_price = {
        lte: priceFloat,
      };
    }

    if (categoriesId) {
      const categoriesArray = categoriesId.split(',').map(d => d as string);
      filters.categories_id = {
        hasSome: categoriesArray,
      };
    }

    if (destinationsId) {
      const destinationsArray = destinationsId.split(',').map(d => d as string);
      filters.destination_id = {
        in: destinationsArray,
      };
    }

    if (rating) {
      const ratingInt = parseInt(rating, 10);
      if (isNaN(ratingInt) || ratingInt < 0 || ratingInt > 5) {
        throw new Error("Invalid rating value");
      }
      filters.rating = {
        gte: ratingInt,
      };
    }

    if (date) {
      const queryDate = new Date(date);
      if (isNaN(queryDate.getTime())) {
        throw new Error("Invalid date value");
      }
      filters.start_date = {
        lte: queryDate,
      };
      filters.end_date = {
        gte: queryDate,
      };
    }

    if (guests) {
      const guestsInt = parseInt(guests, 10);
      if (isNaN(guestsInt) || guestsInt < 1) {
        throw new Error("Invalid guests value");
      }
      filters.max_people = {
        equals: guestsInt,
      };
    }

    const queryOptions: QueryOptions = {
      filters,
      pagination: {
        page: pageInt,
        limit: limitInt,
      },
      sort: {
        [sortBy]: order,
      },
    };

    return { queryOptions, error: null };
  } catch (err) {
    return { queryOptions: null, error: (err as Error).message };
  }
}
