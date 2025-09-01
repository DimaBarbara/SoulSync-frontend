'use client'

import 'react-toastify/dist/ReactToastify.css';
import React, { createContext, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Store from '@/lib/store/store';
import { observer } from 'mobx-react-lite';
import RegistrationForm from './components/RegistrationForm';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

interface State {
  store: Store;
}


const store = new Store();

export const Context = createContext<State>({
  store,
})

const StoreProvider = observer(({ children, initialIsAuth }: {
  children: React.ReactNode;
  initialIsAuth: boolean; 
}) => {
  useEffect(() => {
    store.setAuth(initialIsAuth);
  }, [initialIsAuth]);
  return (
    <Context.Provider value = {{
        store
        }}>
      <Header />
      {children}
      <Footer />
      {store.loginModalOpen ? <LoginForm /> : ''}
      {store.registrationModalOpen ? <RegistrationForm /> : ''}
       <ToastContainer  aria-label="Notification" />
    </Context.Provider>
  );
});

export default StoreProvider;