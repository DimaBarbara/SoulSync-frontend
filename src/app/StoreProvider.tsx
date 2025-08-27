'use client'

import React, { createContext } from 'react';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Footer from './components/Footer';
import Store from '@/lib/store/store';
import { observer } from 'mobx-react-lite';
import RegistrationForm from './components/RegistrationForm';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

const StoreProvider = observer(({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <Context.Provider value = {{
        store
        }}>
      <Header />
      {children}
      <Footer />
      {store.loginModalOpen ? <LoginForm /> : ''}
      {store.registrationModalOpen ? <RegistrationForm /> : ''}
    </Context.Provider>
  );
});

export default StoreProvider;