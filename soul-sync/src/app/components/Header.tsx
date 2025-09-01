'use client'
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../StoreProvider';
import Link from 'next/link';
import Image from "next/image";




const Header = () => {
  const {store} = useContext(Context);
     console.log("Header renders. store.isAuth is:", store.isAuth);
  return (
    <header className=''>
      <div className='flex bg-neutral-100 p-2 justify-between items-center rounded-4xl shadow-md sm: flex-col gap-5 xl:flex-row'>
        <div className='flex bg-amber-200 p-3 rounded-4xl w-60 h-12 items-center justify-center overflow-hidden' >
            <Image 
                src="/images/logo.png" 
                alt="logo" 
                width={180} 
                height={100} 
                priority
                className="object-cover " 
              />
        </div>
        <div className='flex '>
          {store.isAuth 
          ? 
          <React.Fragment>
          <Link href="/" className='flex bg-red-200 p-3 rounded-l-4xl w-30 items-center justify-center hover:bg-red-300 focus:bg-red-300 transition-colors duration-300 ease-in-out '>
            Home
          </Link>
          <Link href="/dashboard" className='flex bg-red-200 p-3 rounded-r-4xl w-30 items-center justify-center hover:bg-red-300 focus:bg-red-300 transition-colors duration-300 ease-in-out'>
            Dashboard
          </Link>
          </React.Fragment> 
          :
          <Link href="/" className='flex bg-red-200 p-3 rounded-4xl w-60 items-center justify-center hover:bg-red-300 focus:bg-red-300 transition-colors duration-300 ease-in-out '>
            Home
          </Link> }
        </div>
        <div className='flex gap-2'>
          {
          store.isAuth ? 
          <button onClick={() => store.logout()} className='flex bg-lime-200 p-3 rounded-4xl w-60 items-center justify-center hover:bg-lime-300 focus:bg-lime-300 transition-colors duration-300 ease-in-out'>Log Out</button> : 
          <React.Fragment>
          <button onClick={() => store.setLoginModalOpen(true)} className='flex bg-lime-200 p-3 rounded-4xl w-30 items-center justify-center hover:bg-lime-300 focus:bg-lime-300 transition-colors duration-300 ease-in-out'>Log In</button>
          <button onClick={() => store.setRegistrationModalOpen(true)} className='flex bg-lime-200 p-3 rounded-4xl w-30 items-center justify-center hover:bg-lime-300 focus:bg-lime-300 transition-colors duration-300 ease-in-out' >Register</button>
         </React.Fragment>
          }
          
        </div>
        
      </div>
    </header>
  );
}

export default observer(Header);