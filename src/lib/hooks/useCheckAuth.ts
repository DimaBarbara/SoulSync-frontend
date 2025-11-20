import { useEffect, useContext } from "react";
import { Context } from "@/app/StoreProvider";
import { useRouter, usePathname } from "next/navigation";

export const useCheckAuth = () => {
  const { store } = useContext(Context);
  const router = useRouter();
  const pathname = usePathname(); 
  const privateRoutes = ["/dashboard"]; 
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {    
    const tokenExists = localStorage.getItem("token");

    if (tokenExists) {
      store.checkAuth();
    } else {
      store.setAuth(false);
      if (isPrivateRoute) {
        router.push('/'); 
      }
    }
  }, [store, isPrivateRoute, router, pathname]);
  useEffect(() => {
    if (isPrivateRoute && !store.isAuth && !store.isLoading) {
       router.push('/');
    }
  }, [isPrivateRoute, store.isAuth, store.isLoading, router]);
};