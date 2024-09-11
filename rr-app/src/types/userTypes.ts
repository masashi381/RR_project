type UserInfo = {
  _id: string;
  user_name: string;
  user_picture: string;
  user_email: string;
  user_password: string;
  user_favorite_restaurant: string[];
  provider?: string;
};

type FirebaseAccount = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  providerData?: Array<ProviderData>;
};

type ProviderData = {
  providerId: string;
};

export enum LoginStatus {
  Unknown = "unknown",
  LoggedIn = "Logged In",
  LoggedOut = "Logged Out",
  SigningUp = "Signing Up",
}

type UserContextProps = {
  user: UserInfo | null;
  setUser: (userStatus: UserInfo | null) => void;
  firebaseAccount: FirebaseAccount | null;
  setFirebaseAccount: (firebaseAccount: FirebaseAccount | null) => void;
  loginStatus: LoginStatus;
  setLoginStatus: (loginStatus: LoginStatus) => void;
};

export type { UserInfo, FirebaseAccount, UserContextProps };
