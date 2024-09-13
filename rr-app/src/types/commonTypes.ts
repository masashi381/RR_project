export type RatingProps = {
  ratings: number; // The rating value, e.g., 4.5
  maxRating?: number; // The maximum rating value, e.g., 5 (default is 5)
};

// Type for Pagination
export type PaginationData = {
  restaurantsPerPage: number;
  totalRestaurants: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

// Type for PageContext
export enum PageStatus {
  Loading = "Loading",
  NotFound = "Not Found",
  Ready = "Ready",
}

export type PageContextProps = {
  pageStatus: PageStatus;
  setPageStatus: (pageStatus: PageStatus) => void;
  notFound: () => void;
};
