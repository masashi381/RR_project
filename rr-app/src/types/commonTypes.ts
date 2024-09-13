import { ReadonlyURLSearchParams } from "next/navigation";

// Type for Pagination
type PaginationData = {
  restaurantsPerPage: number;
  totalRestaurants: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

//Type for DropdownContext
type DropDownContextProps = {
  searchParams: ReadonlyURLSearchParams;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  changedTabs: (tabName: string) => void;
};

// Type for PageContext
export enum PageStatus {
  Loading = "Loading",
  NotFound = "Not Found",
  Ready = "Ready",
}

type PageContextProps = {
  pageStatus: PageStatus;
  setPageStatus: (pageStatus: PageStatus) => void;
  notFound: () => void;
};

//Type for common properties
type RatingProps = {
  ratings: number; // The rating value, e.g., 4.5
  maxRating?: number; // The maximum rating value, e.g., 5 (default is 5)
};

export type { PaginationData, PageContextProps, RatingProps, DropDownContextProps };
