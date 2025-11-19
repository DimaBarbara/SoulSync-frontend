import "./globals.css";
import { Rubik } from "next/font/google";
import StoreProvider from "./StoreProvider";

const rubik = Rubik({
  weight: "900",
  style: "normal",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={rubik.className}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}