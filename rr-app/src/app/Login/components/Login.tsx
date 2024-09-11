import { useRouter } from "next/navigation";

import { Input, TextType } from "@/components/common/Input";
import { Button, BtnType } from "@/components/common/Button";
import Image from "next/image";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login with Email and Password
  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInWithEmailAndPassword(getAuth(), email, password)
      .then((result) => {
        setFirebaseAccount(result.user);
        getUserFromServer(result.user.uid);
      })
      .catch((error) => {
        setAlertMessage(getErrorMessage(error.code));
      });
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
      <Image src="/logo.png" width={90} height={90} alt="logo" className="mb-4" />

      {/* <p>{alertMessage}</p> */}
      <form onSubmit={handleEmailLogin} className="w-64">
        <Input
          textType={TextType.email}
          name="email"
          placeholder="Email"
          // onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          textType={TextType.password}
          name="password"
          placeholder="Password"
          // onChange={(event) => setPassword(event.target.value)}
        />
        <Button type={BtnType.submit} className="btn btn-wide">
          Log In
        </Button>
      </form>
      <Button type={BtnType.regular_google} onClick={handleGoogleLogin}>
        Log In with Google
      </Button>
      <p className="mb-4">or</p>
      <Button type={BtnType.submit} className="btn btn-wide" onClick={() => router.push("/signup")}>
        Sign Up
      </Button>
    </div>
  );
}
