"use client";
import { createContext, ReactNode, useState } from "react";
import { UserInfo, LoginStatus, FirebaseAccount, UserContextProps } from "@/types/userTypes";

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [firebaseAccount, setFirebaseAccount] = useState<FirebaseAccount | null>(null);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.Unknown);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        firebaseAccount,
        setFirebaseAccount,
        loginStatus,
        setLoginStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
