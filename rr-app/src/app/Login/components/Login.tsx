// "use client";
// import { useRouter } from "next/navigation";
// import { Input, TextType } from "@/components/common/Input";
// import { Button, BtnType } from "@/components/common/Button";
// import Image from "next/image";
// import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { useContext, useState } from "react";
// import { UserContext } from "@/context/UserContext";
// import { getErrorMessage } from "@/auth/errors";
// import { LoginStatus, UserInfo } from "@/types/userTypes";

// type LoginDataPropsType = {
//   loginData: UserInfo;
// };
// export default function Login({ loginData }: LoginDataPropsType) {
//   const { setUser, setLoginStatus, setFirebaseAccount } = useContext(UserContext);
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Alert Message
//   const [alertMessage, setAlertMessage] = useState("");

//   const getUserFromServer = (uid: string) => {
//     console.log("uid", uid);

//     if (uid === loginData._id) {
//       setUser(loginData);
//       setLoginStatus(LoginStatus.LoggedIn);
//       router.replace("/restaurants");
//     } else {
//       setUser(null);
//       setLoginStatus(LoginStatus.SigningUp);
//     }
//     // try {
//     //   setUser(loginData);
//     //   setLoginStatus(LoginStatus.LoggedIn);
//     //   router.replace(".restaurants");
//     // } catch {
//     //   setUser(null);
//     //   setLoginStatus(LoginStatus.SigningUp);
//     // }
//     // axios
//     //   .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${uid}`)
//     //   .then((res: any) => {
//     //     setUser(res.data);
//     //     setLoginStatus(LoginStatus.LoggedIn);
//     //     router.replace("/restaurants");
//     //   })
//     //   .catch((error: any) => {
//     //     setUser(null);
//     //     setLoginStatus(LoginStatus.SigningUp);
//     //   });
//   };

//   // Login with Email and Password
//   const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     await signInWithEmailAndPassword(getAuth(), email, password)
//       .then((result) => {
//         setFirebaseAccount(result.user);
//         getUserFromServer(result.user.uid);
//       })
//       .catch((error) => {
//         setAlertMessage(getErrorMessage(error.code));
//       });
//   };

//   // Google Login
//   const handleGoogleLogin = async () => {
//     await signInWithPopup(getAuth(), new GoogleAuthProvider())
//       .then((result) => {
//         setFirebaseAccount(result.user);
//         getUserFromServer(result.user.uid);
//       })
//       .catch((error) => {
//         setAlertMessage(error.code);
//       });
//   };
//   return (
//     <div className="flex flex-col justify-center items-center w-80  mx-auto">
//       <Image src="/rr_logo.png" width={90} height={90} alt="logo" className="mb-4" />

//       <p>{alertMessage}</p>
//       <form onSubmit={handleEmailLogin} className="w-64">
//         <Input
//           textType={TextType.email}
//           name="email"
//           placeholder="Email"
//           onChange={(event) => setEmail(event.target.value)}
//         />
//         <Input
//           textType={TextType.password}
//           name="password"
//           placeholder="Password"
//           onChange={(event) => setPassword(event.target.value)}
//         />
//         <Button type={BtnType.submit} className="btn btn-wide">
//           Log In
//         </Button>
//       </form>
//       <Button type={BtnType.regular_google} onClick={handleGoogleLogin}>
//         Log In with Google
//       </Button>
//       <p className="mb-4">or</p>
//       <Button type={BtnType.submit} className="btn btn-wide" onClick={() => router.push("/signup")}>
//         Sign Up
//       </Button>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { Input, TextType } from "@/components/common/Input";
import { Button, BtnType } from "@/components/common/Button";
import Image from "next/image";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { getErrorMessage } from "@/auth/errors";
import { LoginStatus, UserInfo } from "@/types/userTypes";

type LoginDataPropsType = {
  loginData: UserInfo | null;
};

export default function Login({ loginData }: LoginDataPropsType) {
  const { setUser, setLoginStatus, setFirebaseAccount } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Alert Message
  const [alertMessage, setAlertMessage] = useState<string>("");

  // Helper function to handle login and update context
  const getUserFromServer = (uid: string) => {
    if (uid === loginData?._id) {
      setUser(loginData);
      setLoginStatus(LoginStatus.LoggedIn);
      router.replace("/restaurants");
    } else {
      setUser(null);
      setLoginStatus(LoginStatus.SigningUp);
      setAlertMessage("User not found, redirecting to sign up.");
    }
  };

  // Login with Email and Password
  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const auth = getAuth();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setFirebaseAccount(result.user);
      getUserFromServer(result.user.uid);
    } catch (error: any) {
      setAlertMessage(getErrorMessage(error.code));
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      setFirebaseAccount(result.user);
      getUserFromServer(result.user.uid);
    } catch (error: any) {
      setAlertMessage(getErrorMessage(error.code));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-80 mx-auto">
      <Image src="/rr_logo.png" width={90} height={90} alt="logo" className="mb-4" />

      <p className="text-red-500">{alertMessage}</p>

      <form onSubmit={handleEmailLogin} className="w-64">
        <Input
          textType={TextType.email}
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          textType={TextType.password}
          name="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type={BtnType.submit} className="btn btn-wide">
          Log In
        </Button>
      </form>

      <Button type={BtnType.regular_google} onClick={handleGoogleLogin}>
        Log In with Google
      </Button>

      <p className="mb-4">or</p>

      <Button type={BtnType.submit} className="btn btn-wide" onClick={() => router.push("/SignUp")}>
        Sign Up
      </Button>
    </div>
  );
}
