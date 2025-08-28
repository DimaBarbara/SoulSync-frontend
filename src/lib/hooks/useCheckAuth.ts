import { useEffect, useContext } from "react";
import { Context } from "@/app/StoreProvider"; 

export const useCheckAuth = () => {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store]); 
};