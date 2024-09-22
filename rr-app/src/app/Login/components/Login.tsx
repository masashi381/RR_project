import axios from "axios";
import Image from "next/image";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getErrorMessage } from "@/auth/errors";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { LoginStatus } from "@/types/userTypes";
import { Input, TextType } from "@/components/common/Input";
import { Button, BtnType } from "@/components/common/Button";
const Login = () => {
  const { setUser, setLoginStatus, setFirebaseAccount } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Alert Message
  const [alertMessage, setAlertMessage] = useState("");

  const getUserFromServer = (uid: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/users/${uid}`)
      .then((res) => {
        console.log("get user", res.data);

        setUser(res.data);
        setLoginStatus(LoginStatus.LoggedIn);
        router.replace("/Restaurants");
      })
      .catch(() => {
        setUser(null);
        setLoginStatus(LoginStatus.SigningUp);
      });
  };

  // Helper function for basic email validation using regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Login with Email and Password
  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Client-side validation for email format before Firebase call
    if (!isValidEmail(email)) {
      setAlertMessage("Please enter a valid email address.");
      return;
    }
    try {
      // const result = await signInWithEmailAndPassword(getAuth(), "nonexistent@email.com", "somepassword");

      const result = await signInWithEmailAndPassword(getAuth(), email, password);
      setFirebaseAccount(result.user);
      getUserFromServer(result.user.uid);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("login error: ", error);

      setAlertMessage(getErrorMessage(error.code));
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    await signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then((result) => {
        setFirebaseAccount(result.user);
        getUserFromServer(result.user.uid);
      })
      .catch((error) => {
        setAlertMessage(error.code);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-80  mx-auto">
      <Image src="/rr_logo.png" width={90} height={90} alt="logo" className="mb-4" />

      <p className="text-warning">{alertMessage}</p>
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
        <Button type={BtnType.submit} className="btn btn-wide" isSubmit={true}>
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
};

export default Login;
