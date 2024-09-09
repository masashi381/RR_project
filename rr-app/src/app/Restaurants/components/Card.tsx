import { useRouter } from "next/navigation";
import { PartialRestaurantData } from "../types/type";
import RestaurantInfo from "./RestaurantInfo";
import Address from "./Address";
import Tags from "./Tags";
export default function Card({
  _id,
  restaurant_name,
  restaurant_avg_ratings,
  restaurant_number_reviews,
  restaurant_tags,
  restaurant_add,
}: PartialRestaurantData) {
  const router = useRouter();

  const clickRestaurant = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("clicked");
    router.push(`restaurants/${_id}`);
  };
  return (
    <div onClick={clickRestaurant}>
      <div className="card bg-base-100 shadow-xl m-4 hover:scale-110 cursor-pointer">
        <div className="card-body p-4">
          <RestaurantInfo
            restaurant_name={restaurant_name}
            restaurant_avg_ratings={restaurant_avg_ratings}
            restaurant_number_reviews={restaurant_number_reviews}
          />
          <Address restaurant_add={restaurant_add} />
          <div className="flex">
            <Tags restaurant_tags={restaurant_tags} />
            {/* <FavButton className="" onClick={submitFav} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
