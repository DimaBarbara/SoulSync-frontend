"use client";

import React, { JSX, useContext } from "react";
import {
  FaSmile,
  FaFrown,
  FaAngry,
  FaMeh,
  FaGrinStars,
  FaSurprise,
  FaMask,
  FaRegFlushed,
} from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { Context } from "@/app/StoreProvider";

interface Emotion {
  label: string;
  score: number;
  _id: string;
}

const EmotionBars = observer(() => {
  const { store } = useContext(Context);
  const { mood, isLoading } = store;

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (!mood.text) {
    return (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <p className="pointer-events-auto">
          Data for analysis has not yet been loaded.
        </p>
      </div>
    );
  }

  const emotionIcons: Record<string, JSX.Element> = {
    joy: <FaSmile className="text-yellow-500 mr-2" />,
    happy: <FaSmile className="text-yellow-500 mr-2" />,
    sadness: <FaFrown className="text-blue-500 mr-2" />,
    anger: <FaAngry className="text-red-500 mr-2" />,
    neutral: <FaMeh className="text-green-500 mr-2" />,
    disgust: <FaMask className="text-green-500 mr-2" />,
    surprise: <FaSurprise className="text-purple-500 mr-2" />,
    fear: <FaGrinStars className="text-orange-500 mr-2" />,
    anxious: <FaRegFlushed className="text-orange-400 mr-2" />,
  };

  const barColors: Record<string, string> = {
    joy: "bg-yellow-500",
    happy: "bg-yellow-500",
    sadness: "bg-blue-500",
    anger: "bg-red-500",
    neutral: "bg-green-500",
    disgust: "bg-green-500",
    surprise: "bg-purple-500",
    fear: "bg-orange-500",
    anxious: "bg-orange-400",
  };

  const getBarColor = (label: string) => {
    const normalizedLabel = label.toLowerCase();
    return barColors[normalizedLabel] || "bg-green-400";
  };

  const getIcon = (label: string) => {
    const normalizedLabel = label.toLowerCase();
    return (
      emotionIcons[normalizedLabel] || <FaSmile className="text-gray-400 mr-2" />
    );
  };

  return (
    <section className="bg-neutral-100 p-6 rounded-3xl shadow-md text-center h-full">
      <h2 className="text-2xl font-bold mb-4">Mood Analysis</h2>
      <p className="text-gray-600 mb-6">{mood.text}</p>
      {mood.emotions.map((e) => (
        <div key={e._id} className="flex items-center mb-3">
          {getIcon(e.label)}
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 ${getBarColor(e.label)} rounded-full transition-all duration-300`}
              style={{ width: `${e.score}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-700">
            {e.score.toFixed(1)}%
          </span>
        </div>
      ))}
    </section>
  );
});

export default EmotionBars;