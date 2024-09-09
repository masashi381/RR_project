import HeaderLogo from "./HeaderLogo";

export default function Header() {
  return (
    <header className=" bg-primary h-16 flex fixed top-0 w-full z-50">
      <HeaderLogo />
      <div className="flex justify-center items-center">
        {/* <SearchBar />
        {user ? (
          <Avatar />
        ) : (
          <Button
            type={BtnType.logIn}
            onClick={() => router.push("/login")}
            className=" btn px-2"
          >
            Log In
          </Button>
        )} */}
      </div>
    </header>
    // <div>header</div>
  );
}
