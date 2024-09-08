import { redirect, RedirectType } from "next/navigation";

const Page = () => {
  redirect("/Restaurants", RedirectType.replace);
};

export default Page;
