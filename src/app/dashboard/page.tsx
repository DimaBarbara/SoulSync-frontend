"use client"; // This must be the first line
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../StoreProvider";
import { observer } from "mobx-react-lite";

const DashboardPage = () => {
  const { store } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!store.isAuth) {
      router.push("/");
    }
  }, [store.isAuth, router]);
  return <div></div>;
};

export default observer(DashboardPage);
