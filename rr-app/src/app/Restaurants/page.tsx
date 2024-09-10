import Restaurants from "./components/Restaurants";
import axios from "axios";
export default async function Page() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Restaurants/api`);

  console.log("data", res.data);

  return (
    <div>
      <Restaurants restaurantsData={res.data} />
    </div>
  );
}
