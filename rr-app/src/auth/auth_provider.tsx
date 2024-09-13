"use client";
import { usePathname, useRouter } from "next/navigation";
import { Limitation, Page, PAGES, Permission } from "./authType";
import { PageContext } from "@/context/PageContext";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { initializeFirebase } from "./firebase";
import { getAuth } from "firebase/auth";
import { PageStatus } from "@/types/commonTypes";
import { LoginStatus } from "@/types/userTypes";
import axios from "axios";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import Header from "@/app/Header/components/Header";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const { pageStatus, setPageStatus } = useContext(PageContext);
  const { user, setUser, setFirebaseAccount, loginStatus, setLoginStatus } = useContext(UserContext);

  useEffect(() => {
    initializeFirebase;

    getAuth().onAuthStateChanged(async (firebaseAccount) => {
      // Using this handler is only user access to our page
      if (loginStatus !== LoginStatus.Unknown) {
        return;
      }

      if (firebaseAccount) {
        setFirebaseAccount(firebaseAccount);

        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Login/api/${firebaseAccount.uid}`);

          if (res.status === 200 && res.data) {
            setUser(res.data);
            setLoginStatus(LoginStatus.LoggedIn);
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          setUser(null);
          setLoginStatus(LoginStatus.SigningUp);
        }
      } else {
        setUser(null);
        setLoginStatus(LoginStatus.LoggedOut);
      }
    });
  }, [loginStatus, setFirebaseAccount, setLoginStatus, setUser]);

  useEffect(() => {
    // When the user switches the page, check the page restriction
    const isAllowedPage = (): Permission => {
      const page = getPage(pathName);
      if (page === undefined) {
        return { isAllowed: true, redirection: "" };
      }
      //wait until the login status is confirmed
      else if (loginStatus === LoginStatus.Unknown) {
        return { isAllowed: false, redirection: "" };
      }
      // If user is logged in
      else if (loginStatus === LoginStatus.LoggedIn) {
        if (user) {
          if (!(page.limitation === Limitation.None || page.limitation === Limitation.LoggedIn)) {
            return { isAllowed: false, redirection: "/restaurants" };
          }
        } else {
          console.error("User is logged in but the data doesn't exist");
          return { isAllowed: false, redirection: "/restaurants" };
        }
      }
      // If the user is not logged in
      else if (loginStatus === LoginStatus.LoggedOut) {
        // Give permission only to allowed pages
        if (page.limitation !== Limitation.None) {
          // Go to the login page, but don't redirect from sign up page
          if (pathName !== "/signup" && pathName !== "/login") {
            return { isAllowed: false, redirection: "/" };
          }
        }
      }

      // If this user is in the process of sign up
      else if (loginStatus === LoginStatus.SigningUp) {
        // Go to the sign up page, but don't redirect from sign up page

        if (pathName !== "/signup") {
          return { isAllowed: false, redirection: "/signup" };
        }
      }

      return { isAllowed: true, redirection: "" };
    };

    const result = isAllowedPage();
    if (!result.isAllowed && result.redirection) {
      router.replace(result.redirection);
    }
  }, [pathName, loginStatus, user, router]);

  useEffect(() => {
    if (loginStatus === LoginStatus.Unknown) {
      setPageStatus(PageStatus.Loading);
    } else {
      setPageStatus(PageStatus.Ready);
    }
  }, [pathName, loginStatus, setPageStatus]);

  const isHeaderReady = (): boolean => {
    if (pathName.length > 0 && pathName !== "/login" && pathName !== "/signup" && pageStatus === PageStatus.Ready) {
      return true;
    }
    return false;
  };
  const getComponent = () => {
    switch (pageStatus) {
      case PageStatus.Loading:
        return (
          <>
            <Loading />
          </>
        );
      case PageStatus.Ready:
        return <>{children}</>;
      case PageStatus.NotFound:
        return <NotFound />;
    }
  };

  return (
    <>
      {isHeaderReady() && <Header />}
      {getComponent()}
    </>
  );
};

const getPage = (pathName: string): Page | undefined => {
  return PAGES.find((PAGE: Page) => {
    return PAGE.path.test(pathName);
  });
};

export default AuthProvider;
