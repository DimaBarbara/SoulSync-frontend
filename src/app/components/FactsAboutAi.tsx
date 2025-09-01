import React from "react";
import { FaRobot, FaBrain, FaLightbulb, FaSmile } from "react-icons/fa";

const FactsAboutAI = () => {
  const facts = [
    {
      icon: <FaRobot size={40} className="text-blue-500 mb-2" />,
      title: "Smart Recommendations",
      description: "AI analyzes your mood and suggests personalized content instantly.",
    },
    {
      icon: <FaBrain size={40} className="text-green-500 mb-2" />,
      title: "Learning Abilities",
      description: "Our AI learns from patterns and improves its understanding over time.",
    },
    {
      icon: <FaLightbulb size={40} className="text-yellow-500 mb-2" />,
      title: "Creative Ideas",
      description: "It can generate ideas, advice, or even tiny stories based on your mood.",
    },
    {
      icon: <FaSmile size={40} className="text-pink-500 mb-2" />,
      title: "Mood Detection",
      description: "It detects your current mood in real-time to give more relevant suggestions.",
    },
  ];

  return (
    <section className="bg-neutral-100 p-6 rounded-3xl mt-8 shadow-md text-center mb-40 sm:mb-25 xl:mb-0">
      <h2 className="text-2xl font-bold mb-6">Cool Things AI Can Do</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {facts.map((fact, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            {fact.icon}
            <h3 className="font-semibold text-lg mb-2">{fact.title}</h3>
            <p className="text-gray-600 text-sm">{fact.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FactsAboutAI;