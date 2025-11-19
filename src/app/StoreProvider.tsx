"use client";

import "react-toastify/dist/ReactToasty.css";
import React, { createContext, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Store from "@/lib/store/store";
import { observer } from "mobx-react-lite";
import RegistrationForm from "./components/RegistrationForm";
import Header from "./components/Header";
import { toast, ToastContainer } from "react-toastify";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const StoreProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
      if (store.user && store.user.isActivated) {
        toast.info("You successfully activated your account!");
      }
    }, []);

    return (
      <Context.Provider value={{ store }}>
        <Header />
        {children}
        <Footer />

        {store.loginModalOpen && <LoginForm />}
        {store.registrationModalOpen && <RegistrationForm />}
        
        <ToastContainer aria-label="Notification" />

        {store.isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="loader"></div>
          </div>
        )}
      </Context.Provider>
    );
  }
);

export default StoreProvider;