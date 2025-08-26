'use client'

import React, { createContext, useContext } from 'react';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Footer from './components/Footer';
import Store from '@/lib/store/store';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

export default function StoreProvider({ children }: {
  children: React.ReactNode;
}) {
  const {store} = useContext(Context);

  return (
    <Context.Provider value = {{
        store
        }}>
      <Header />
      {children}
      <Footer />
      {store.isAuth ? '' : <LoginForm />}
    </Context.Provider>
  );
}