import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

interface MoodChartProps {
  data: MoodData;
}

const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const chartData = {
    labels: data.emotions.map((e) => e.label.toUpperCase()),
    datasets: [
      {
        data: data.emotions.map((e) => e.score),
        backgroundColor: ["#FACC15", "#3B82F6", "#EF4444"],
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <section className="bg-neutral-100 p-6 rounded-3xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Mood Distribution</h2>
      <p className="text-gray-600 mb-6">{data.text}</p>
      <div className="max-w-xs mx-auto">
        <Doughnut data={chartData} />
      </div>
      <p className="mt-4 text-sm text-gray-500">{data.advice}</p>
    </section>
  );
};

export default MoodChart;
