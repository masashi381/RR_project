import axios from "axios";

export default async function Page() {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/SignUp/api`);

  console.log("data: ", res.data);

  return <div>signup</div>;
}
