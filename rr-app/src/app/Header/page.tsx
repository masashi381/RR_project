"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Avatar from "./components/Avatar";
import HeaderLogo from "./components/HeaderLogo";
import { UserContext } from "@/context/UserContext";
import { Button, BtnType } from "@/components/common/Button";
import SearchBar from "./components/SearchBar";
const Header = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <header className="bg-primary h-16 flex fixed top-0 w-full z-50">
      <HeaderLogo />
      <div className=" flex justify-center items-center">
        <p>test</p>
        {/* <SearchBar />
        {user ? (
          <Avatar />
        ) : (
          <Button type={BtnType.logIn} onClick={() => router.push("/Login")} className=" btn px-2">
            Log In
          </Button>
        )} */}
      </div>
    </header>
  );
};

export default Header;
