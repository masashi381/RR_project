import type { Metadata } from "next";
import AuthProvider from "@/auth/auth_provider";
import { PageContextProvider } from "@/context/PageContext";
import { UserContextProvider } from "@/context/UserContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <PageContextProvider>
          <UserContextProvider>
            <AuthProvider>{children}</AuthProvider>
          </UserContextProvider>
        </PageContextProvider>
      </body>
    </html>
  );
}
