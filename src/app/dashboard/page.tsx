'use client'

import React, { useContext, useEffect } from 'react';
import { Context } from '../StoreProvider';

export default function DashboardPage() {
   const { store } = useContext(Context);
  
      useEffect(() => {
          if (localStorage.getItem('token')) {
              store.checkAuth();
          }
      }, []);
  return (
    <div>
    </div>
  );
}