import axios from "axios";
// import { restauratntType } from "./types/type";
export default async function Page() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Restaurants/api`);
  const post = await res.data();
  console.log("post", post);

  return (
    <ul>
      {/* {post.map((data: restauratntType, i: number) => (
        <li key={i}>{data}</li>
      ))} */}
    </ul>
  );
}
