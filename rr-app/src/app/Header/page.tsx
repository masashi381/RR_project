import Header from "./components/Header";
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/Restaurants/api/?` + searchParams);
  const data = await res.json();
  console.log("search value: ", data);
  return <Header />;
}
