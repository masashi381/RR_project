import { PaginationData } from "@/types/commonTypes";
export default function Pagination({ restaurantsPerPage, totalRestaurants, paginate, currentPage }: PaginationData) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="join flex justify-center pt-4 bg-accent">
      {pageNumbers.map((number) => (
        <input
          key={number}
          className={`${number === currentPage ? "active" : ""} 
          ${number === 1 ? "join-item btn btn-square rounded-lg" : "join-item btn btn-square"}`}
          type="radio"
          name="options"
          aria-label={`${number}`}
          onClick={() => paginate(number)}
          defaultChecked={number === currentPage}
        />
      ))}
    </div>
  );
}
