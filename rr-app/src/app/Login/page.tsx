// import axios from "axios";
// import Login from "./components/Login";

// const uid: string = "";
// export default async function Page() {
//   console.log("uid: " + uid);

//   const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Login/api/${uid}`);
//   const loginData = res.data;
//   console.log("login data ", loginData);

//   return (
//     <>
//       <Login loginData={loginData} />
//     </>
//   );
// }

import axios from "axios";
import Login from "./components/Login";
import { UserInfo } from "@/types/userTypes";

// Define types for user and firebaseAccount
interface FirebaseAccount {
  uid: string;
}

interface PageProps {
  firebaseAccount: FirebaseAccount | null;
}

const fetchUserData = async (uid: string | undefined): Promise<UserInfo | null> => {
  try {
    const res = await axios.get<UserInfo>(`${process.env.NEXT_PUBLIC_URL}/Login/api/${uid}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

const Page = async ({ firebaseAccount }: PageProps) => {
  // if (!firebaseAccount) {
  //   return <div>No user logged in</div>;
  // }

  const user = await fetchUserData(firebaseAccount?.uid);

  if (!user) {
    return (
      <div>
        <Login loginData={user} />
      </div>
    );
  }

  return <div>{/* <Login loginData={user} /> */}</div>;
};

export default Page;
