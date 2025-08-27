'use client'
import { useContext, useEffect } from "react";
import FactsAboutAI from "./components/FactsAboutAi";
import GreetingsImage from "./components/GreetingImage";
import Greetings from "./components/Greetings";
import { Context } from "./StoreProvider";
import { observer } from "mobx-react-lite"; 


function Home() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    return (
        <div>
            <div className="flex gap-6 ">
                <div className="flex-2">
                    <Greetings />
                </div>
                <div className="flex-1">
                    <GreetingsImage />
                </div>
            </div>
            <FactsAboutAI />
        </div>
    );
}

export default observer(Home);