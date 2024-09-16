import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { ReviewsContext } from "@/context/ReviewsContext";
import axios from "axios";

type Props = {
  uid: string | undefined;
};
const User = ({ uid }: Props) => {
  const { user } = useContext(UserContext);
  const { allReviews } = useContext(ReviewsContext);
  const [userName, setUserName] = useState<string | undefined>("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (!uid) return;

      //Check if the current user ID matches any review's user ID
      const review = allReviews.find((review) => review.userId === uid);
      if (review) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/${uid}`);
          setUserName(res.data.user_name);
        } catch (err) {
          console.error("getUser error", err);
        }
      } else {
        setUserName(user?.user_name);
      }
    };
    fetchUserName();
  }, [allReviews, uid, user]);

  // icons show capital letter of user name
  let icon = "";
  if (userName) {
    for (let i = 0; i < userName?.length!; i++) {
      if (i === 0) {
        icon += userName[0].toUpperCase();
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="avatar placeholder">
        <div
          className={` w-24 rounded-full ${
            userName === user?.user_name ? "bg-secondary text-gray-900" : "bg-primary text-accent"
          }`}
        >
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
      <h3 className="w-24 text-center mt-1 text-xl">{userName}</h3>
    </div>
  );
};

export default React.memo(User);
