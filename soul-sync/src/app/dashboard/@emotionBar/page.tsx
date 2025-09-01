'use client';

import React, { JSX, useContext } from "react";
import { FaSmile, FaFrown, FaAngry, FaMeh, FaGrinStars, FaSurprise, FaMask } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { Context } from "@/app/StoreProvider";


interface Emotion {
  label: "joy" | "sadness" | "anger" | "neutral" | "disgust" | "surprise" | "fear" ;
  score: number;
  _id: string;
}

const EmotionBars = observer(() => {
  const { store } = useContext(Context);
  const { mood, isLoading } = store;

   if (isLoading) {
    return (
        <div className="loader"></div>
      
    );
  }
  
  if (!mood.text) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <p className="pointer-events-auto">Data for analysis has not yet been loaded.</p>
    </div>
  );
}
  const emotionIcons: Record<Emotion["label"], JSX.Element> = {
    joy: <FaSmile className="text-yellow-500 mr-2" />,
    sadness: <FaFrown className="text-blue-500 mr-2" />,
    anger: <FaAngry className="text-red-500 mr-2" />,
    neutral: <FaMeh className="text-gray-500 mr-2" />,
    disgust: <FaMask className="text-green-500 mr-2" />,
    surprise: <FaSurprise className="text-purple-500 mr-2" />,
    fear: <FaGrinStars className="text-orange-500 mr-2" />,
  };

  const barColors: Record<Emotion["label"], string> = {
    joy: "bg-yellow-500",
    sadness: "bg-blue-500",
    anger: "bg-red-500",
    neutral: "bg-gray-500",
    disgust: "bg-green-500",
    surprise: "bg-purple-500",
    fear: "bg-orange-500",
  };

  return (
    <section className="bg-neutral-100 p-6 rounded-3xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Mood Analysis</h2>
      <p className="text-gray-600 mb-6">{mood.text}</p>
      {mood.emotions.map((e) => (
        <div key={e._id} className="flex items-center mb-3">
          {emotionIcons[e.label as Emotion["label"]] || <FaSmile className="text-gray-400 mr-2" />}
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 ${barColors[e.label as Emotion["label"]]} rounded-full transition-all duration-300`}
              style={{ width: `${e.score}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-700">{e.score.toFixed(1)}%</span>
        </div>
      ))}
    </section>
  );
});

export default EmotionBars;
