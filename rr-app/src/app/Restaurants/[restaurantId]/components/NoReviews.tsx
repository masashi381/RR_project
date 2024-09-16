import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { LoginStatus } from "@/types/userTypes";

function NoReviews() {
  const { loginStatus } = useContext(UserContext);

  return (
    <div className="flex justify-center items-center lg:w-2/3 lg:h-96">
      {loginStatus === LoginStatus.LoggedIn ? (
        <h3 className="text-2xl text-center mt-4">
          There are no reviews yet.
          <br /> Your review would be appreciated
        </h3>
      ) : (
        <h3 className="text-2xl text-center mt-4">Please log in before reviewing</h3>
      )}
    </div>
  );
}

export default NoReviews;
