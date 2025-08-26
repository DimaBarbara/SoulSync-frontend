'use client'
import { useContext, useEffect } from "react";
import FactsAboutAI from "./components/FactsAboutAi";
import GreetingsImage from "./components/GreetingImage";
import Greetings from "./components/Greetings";
import { Context } from "./StoreProvider";


export default function Home() {

const {store} = useContext(Context)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }

  })
  return (
    <div >
      <h2>{store.isAuth ? `Пользователь авторизован` : 'не авторизован '}</h2>
      <div className="flex gap-6 ">
        <div className="flex-2">
          <Greetings />
        </div>
        <div className="flex-1">
          <GreetingsImage />
        </div>
      </div>
      <FactsAboutAI/>
    </div>
    
  )
}