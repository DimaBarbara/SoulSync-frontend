"use client";

import { useContext, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Context } from "./StoreProvider";
import { observer } from "mobx-react-lite";

function SearchHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { store } = useContext(Context);

  useEffect(() => {
    const showLoginParam = searchParams.get("showLogin");
    
    if (showLoginParam === "true") {
      store.setLoginModalOpen(true);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("showLogin");
      router.replace(`/?${newSearchParams.toString()}`); 
    }
  }, [searchParams, router, store]);

  return null;
}

export default observer(SearchHandler);