"use client";

import { DropDownContext } from "@/context/DropDownContext";
import { useContext, useEffect } from "react";
import MyFavorite from "./components/myFavorite/MyFavorite";
import MyReviews from "./components/myReviews/MyReviews";
import UserProfile from "./components/userProfile/UserProfile";
import UserEdit from "./components/userEdit/UserEdit";
import { ReviewsContext } from "@/context/ReviewsContext";

export default function Page() {
  const { activeTab, changedTabs } = useContext(DropDownContext);
  const { setAllReviews } = useContext(ReviewsContext);

  // Clear allReviews when navigating to "My Reviews" page
  useEffect(() => {
    setAllReviews([]);
  }, [setAllReviews]);

  return (
    <>
      <div id="TabContainer" className="bg-accent h-full pt-24">
        <div id="TabHead" className="flex py-2 mx-4 border-b-2 border-black ">
          <label
            className={`block text-center rounded-tl-lg w-32 cursor-pointer ${
              activeTab === "favorite" ? "bg-secondary text-black" : "bg-primary text-white"
            }`}
          >
            <input type="radio" name="my_tab" className="type: hidden" onClick={() => changedTabs("favorite")} />
            My Favorite
          </label>
          <label
            className={`block text-center w-32 cursor-pointer ${
              activeTab === "reviews" ? "bg-secondary text-black" : "bg-primary text-white"
            }`}
          >
            <input type="radio" name="my_tab" className="type: hidden" onClick={() => changedTabs("reviews")} />
            My Reviews
          </label>
          <label
            className={`block text-center rounded-tr-lg w-32 cursor-pointer ${
              activeTab === "userProfile" || activeTab === "userEdit"
                ? "bg-secondary text-black"
                : "bg-primary text-white"
            }`}
          >
            <input type="radio" name="my_tab" className="type: hidden" onClick={() => changedTabs("userProfile")} />
            User Profile
          </label>
        </div>
        <div>
          {activeTab === "favorite" && <MyFavorite />}
          {activeTab === "reviews" && <MyReviews />}
          {activeTab === "userProfile" && <UserProfile />}
          {activeTab === "userEdit" && <UserEdit />}
        </div>
      </div>
    </>
  );
}
