import React, { JSX } from "react";
import { FaSmile, FaFrown, FaAngry } from "react-icons/fa";

interface Emotion {
  label: "joy" | "sadness" | "anger";
  score: number;
  _id: string;
}

interface MoodData {
  userId: string;
  text: string;
  emotions: Emotion[];
  advice: string;
  _id: string;
  date: string;
}

interface EmotionBarsProps {
  data: MoodData;
}

const EmotionBars: React.FC<EmotionBarsProps> = ({ data }) => {
  const emotionIcons: Record<Emotion["label"], JSX.Element> = {
    joy: <FaSmile className="text-yellow-500 mr-2" />,
    sadness: <FaFrown className="text-blue-500 mr-2" />,
    anger: <FaAngry className="text-red-500 mr-2" />,
  };

  const barColors: Record<Emotion["label"], string> = {
    joy: "bg-yellow-500",
    sadness: "bg-blue-500",
    anger: "bg-red-500",
  };

  return (
    <section className="bg-neutral-100 p-6 rounded-3xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Mood Analysis</h2>
      <p className="text-gray-600 mb-6">{data.text}</p>
      {data.emotions.map((e) => (
        <div key={e._id} className="flex items-center mb-3">
          {emotionIcons[e.label]}
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 ${barColors[e.label]} rounded-full transition-all duration-300`}
              style={{ width: `${e.score}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-700">{e.score.toFixed(1)}%</span>
        </div>
      ))}
      <p className="mt-4 text-sm text-gray-500">{data.advice}</p>
    </section>
  );
};

export default EmotionBars;
