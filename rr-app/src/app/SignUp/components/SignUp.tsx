"use client";
import { useContext, useState } from "react";
import { Input, TextType } from "@/components/common/Input";
import { Button, BtnType } from "@/components/common/Button";
import { UserContext } from "@/context/UserContext";
import { LoginStatus } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getErrorMessage } from "@/auth/errors";

const SignUp = () => {
  const { setUser, firebaseAccount, setFirebaseAccount, loginStatus, setLoginStatus } = useContext(UserContext);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  //Alert Message
  const [alertMessage, setAlertMessage] = useState("");

  //signup with email and password
  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(getAuth(), email, password)
        .then((result) => {
          setFirebaseAccount(result.user);
          setLoginStatus(LoginStatus.SigningUp);
        })
        .catch((error: any) => {
          setAlertMessage(getErrorMessage(error.code));
          console.log(error);
        });
    } else {
      setAlertMessage("Password and Confirm Password doesn't much");
    }
  };

  //signup with google account
  const handleGoogleAuth = async () => {
    await signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then((result) => {
        setFirebaseAccount(result.user);
        setLoginStatus(LoginStatus.SigningUp);
      })
      .catch((error: any) => {
        setFirebaseAccount(null);
        setAlertMessage(getErrorMessage(error.code));
      });
  };

  // register to DB
  const handleSingUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firebaseAccount) {
      console.error("No firebase account");
      return;
    }

    const formData = new FormData();
    const userInputObj = {
      _id: firebaseAccount.uid,
      user_name: name,
      user_picture: "",
      user_email: firebaseAccount.email!,
      user_favorite_restaurant: [""],
      provider: firebaseAccount.providerData![0].providerId,
    };

    Object.entries(userInputObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          //array divided to reenter formData
          formData.append(key + "[]", v);
        });
      } else {
        formData.append(key, value);
      }
    });

    await axios
      .post(`${process.env.NEXT_PUBLIC_URL}api/users`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setUser(res.data);
        setLoginStatus(LoginStatus.LoggedIn);
        router.replace("/Restaurants");
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-center mb-5">Sign Up</h1>

      {loginStatus === LoginStatus.LoggedOut && (
        //first step
        <div>
          <p className="text-warning">{alertMessage}</p>
          <form onSubmit={handleEmailAuth} name="handleEmailAuth">
            <div className="flex flex-col items-center">
              <Input
                textType={TextType.text}
                name="userEmail"
                placeholder="Your email address"
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                textType={TextType.password}
                name="userPassword"
                placeholder="Create password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Input
                textType={TextType.password}
                name="userConfirmPassword"
                placeholder="Confirm password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <Button type={BtnType.submit} className="btn btn-wide">
                Next
              </Button>
              <p className="mb-4">or</p>
            </div>
          </form>
          <Button type={BtnType.regular_google} onClick={handleGoogleAuth}>
            Sign up with Google
          </Button>
        </div>
      )}

      {loginStatus === LoginStatus.SigningUp && (
        // second step
        <div>
          <form onSubmit={handleSingUp} name="handlesSingUp">
            <div className="flex flex-col">
              <Input
                textType={TextType.text}
                name="userName"
                placeholder="type your name"
                onChange={(event) => setName(event.target.value)}
              />
              <Button type={BtnType.submit}>Register</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
