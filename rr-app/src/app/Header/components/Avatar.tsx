"use client";
import { FaHeart, FaSignOutAlt } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import { DropDownContext } from "@/context/DropDownContext";
import { UserContext } from "@/context/UserContext";
import { LoginStatus } from "@/types/userTypes";
import { getAuth, signOut } from "firebase/auth";
import { ReviewsContext } from "@/context/ReviewsContext";

export default function Avatar() {
  const router = useRouter();
  const dropDownRef = useRef<HTMLDetailsElement>(null);
  const { setActiveTab } = useContext(DropDownContext);
  const { user, setUser, setLoginStatus } = useContext(UserContext);
  const { setAllReviews } = useContext(ReviewsContext);

  let icon = "";
  if (user?.user_name) {
    for (let i = 0; i < user?.user_name.length; i++) {
      if (i === 0) {
        icon += user?.user_name[0].toUpperCase();
      }
    }
  }

  const changedTabs = (tabName: string) => {
    setActiveTab(tabName);
    // Clear allReviews when navigating to "My Reviews" page
    setAllReviews([]);
    router.push(`/users?tab=${tabName}`);
    if (dropDownRef.current) {
      dropDownRef.current.removeAttribute("open");
    }
  };

  const handleLogOut = async () => {
    await signOut(getAuth())
      .then(() => {
        setUser(null);
        setLoginStatus(LoginStatus.LoggedOut);
      })
      .catch((error) => {
        console.error(error);
      });
    router.push("/");
  };

  return (
    <details className="dropdown dropdown-end mr-4 z-50" ref={dropDownRef}>
      <summary className="btn btn-secondary btn-circle avatar placeholder">
        <div className="w-10 rounded-full">
          <span>{icon}</span>
        </div>
      </summary>
      <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-44 z-10">
        <li className="btn btn-ghost px-2 min-h-0 h-9" onClick={() => changedTabs("favorite")}>
          <div>
            <FaHeart className="text-secondary" />
            <a>My Favorite</a>
          </div>
        </li>
        <li className="btn btn-ghost px-2 min-h-0 h-9" onClick={() => changedTabs("reviews")}>
          <div>
            <MdReviews className="text-secondary" />
            <a>My Reviews</a>
          </div>
        </li>
        <li className="btn btn-ghost px-2 min-h-0 h-9" onClick={() => changedTabs("userProfile")}>
          <div>
            <CgProfile className="text-secondary" />
            <a>User Profile</a>
          </div>
        </li>
        <li className="btn btn-ghost  min-h-0 h-9" onClick={handleLogOut}>
          <div>
            <FaSignOutAlt className="text-secondary" />
            <a className="pr-4">Sign Out</a>
          </div>
        </li>
      </ul>
    </details>
  );
}
