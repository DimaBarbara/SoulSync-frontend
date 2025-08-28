'use client';

import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { observer } from "mobx-react-lite";
import { Context } from "@/app/StoreProvider";


ChartJS.register(ArcElement, Tooltip, Legend);

const MoodChart = () => {
  const { store } = useContext(Context);
  const { mood, isLoading } = store;

  if (!mood.text) {
    return (
     ''
    )
  }
  if (isLoading) {
    return (
     ''
    );
  }

  const chartData = {
    labels: mood.emotions.map((e) => e.label.toUpperCase()),
    datasets: [
      {
        data: mood.emotions.map((e) => e.score),
        backgroundColor: ["#FACC15", "#3B82F6", "#EF4444"],
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <section className="bg-neutral-100 p-6 rounded-3xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Mood distribution</h2>
      <p className="text-gray-600 mb-6">{mood.text}</p>
      <div className="max-w-xs mx-auto">
        <Doughnut data={chartData} />
      </div>
    </section>
  );
};

export default observer(MoodChart);