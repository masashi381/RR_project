"use client";
import { RestaurantType } from "../types/type";

type PostType = {
  post: RestaurantType[];
};
export default function Restaurants({ post }: PostType) {
  console.log("post", post);

  return (
    <div>
      <ul>
        {post.map((data: RestaurantType, i: number) => (
          <li key={i}>{data.restaurant_name}</li>
        ))}
      </ul>
    </div>
  );
}
