"use client";
import { Button, BtnType } from "./Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-1/2 m-auto flex flex-col items-center relative top-28">
      <h2 className="text-6xl text-primary">404</h2>
      <p className="text-2xl mb-3">Sorry, the page you are looking for can&apos;t be found</p>
      <Button type={BtnType.submit} onClick={() => router.push("/")}>
        Go back to Home
      </Button>
    </div>
  );
}
