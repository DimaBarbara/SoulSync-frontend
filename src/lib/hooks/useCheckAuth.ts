import { useEffect, useContext } from "react";
import { Context } from "@/app/StoreProvider";
import { IUser } from "../models/IUser";

export const useCheckAuth = () => {
  const { store } = useContext(Context);

  useEffect(() => {    
    if (localStorage.getItem("token")) {
      store.checkAuth();
    } else {
      store.setAuth(false); 
      store.setUser({} as IUser);
    }
    
  }, []);
};
