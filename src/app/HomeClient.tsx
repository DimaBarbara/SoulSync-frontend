"use client";

import Greetings from "./components/Greetings";
import GreetingsImage from "./components/GreetingImage";
import FactsAboutAI from "./components/FactsAboutAi";
import { observer } from "mobx-react-lite";


function HomeClient() { 
  return (
    <div>
      <div className="flex gap-6 sm: flex-col xl:flex-row ">
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

export default observer(HomeClient);