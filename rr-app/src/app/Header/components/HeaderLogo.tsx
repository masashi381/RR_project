"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { useCallback, useContext, useEffect } from "react";
// import { RestaurantContext } from "@/context/RestaurantContext";
// import axios from "axios";

const HeaderLogo = () => {
  const homeRouter = useRouter();
  // const { setRestaurantsData } = useContext(RestaurantContext);

  // const getRestaurantsData = useCallback(async () => {
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/restaurants`
  //   );
  //   setRestaurantsData(res.data);
  // }, [setRestaurantsData]);

  const clickedHomeHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // event.preventDefault();
    // getRestaurantsData(); // Refetch data when navigating back home
    homeRouter.push("/");
  };

  // useEffect(() => {
  //   getRestaurantsData();
  // }, [getRestaurantsData]);

  return (
    <div className="flex flex-1 ml-4 items-center">
      <a
        className="btn btn-ghost text-xl p-0 text-accent"
        // onClick={clickedHomeHandler}
      >
        <Image src="/rr_logo.png" width={40} height={40} alt="logo" />
      </a>
    </div>
  );
};

export default HeaderLogo;
