"use client";

import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "@/app/StoreProvider";
import { FaLightbulb, FaRegSmileBeam, FaRegHandPeace } from "react-icons/fa";

const AdviceBox = observer(() => {
  const { store } = useContext(Context);
  const { mood, isLoading } = store;

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (!mood.advice) {
    return 
  }
  const emoji = mood.advice.toLowerCase().includes("relax")
    ? "😌"
    : mood.advice.toLowerCase().includes("focus")
    ? "🎯"
    : mood.advice.toLowerCase().includes("breathe")
    ? "🌬️"
    : "✨";

  return (
    <section className="bg-white p-6 rounded-3xl shadow-md text-center border border-neutral-200">
      <h2 className="text-2xl font-bold mb-3 flex justify-center items-center gap-2">
        <FaLightbulb className="text-yellow-500" /> Your Advice
      </h2>

      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        {mood.advice} <span className="ml-1">{emoji}</span>
      </p>

      <div className="flex justify-center gap-3 mt-4 text-xl text-neutral-500">
        <FaRegSmileBeam />
        <FaRegHandPeace />
      </div>
    </section>
  );
});

export default AdviceBox;
