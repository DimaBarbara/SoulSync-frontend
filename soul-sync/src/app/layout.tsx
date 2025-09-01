import "./globals.css";
import {Rubik} from 'next/font/google'
import StoreProvider from "./StoreProvider";
import { cookies } from "next/headers";



const rubik = Rubik({
   weight: '900',
   style: 'normal',
   subsets: ['latin']
  }) 


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken');
  const initialIsAuth = !!token;
  return (
 <html lang="en" className={rubik.className}>
      <body>
        <StoreProvider initialIsAuth={initialIsAuth}  >
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
