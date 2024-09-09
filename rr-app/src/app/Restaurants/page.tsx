// import { restauratntType } from "./types/type";
import Restaurants from "./components/Restaurants";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/Restaurants/api`);
  const post = await res.json(); // Parse JSON data

  console.log("post", post);

  return (
    <div>
      <Restaurants post={post.message} />
    </div>
  );
}
