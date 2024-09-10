import axios from "axios";

export default async function Page() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Login/api`);
  console.log("login data ", res.data);
  return <div>login</div>;
}
