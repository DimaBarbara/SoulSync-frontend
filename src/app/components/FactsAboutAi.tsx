import React from "react";
import { FaRobot, FaBrain, FaLightbulb, FaSmile } from "react-icons/fa";

const FactsAboutAI = () => {
  const facts = [
    {
      icon: (
        <div className="group peer inline-block cursor-pointer p-2">
          <FaRobot
            size={40}
            className="text-blue-500 mb-2 transition-all duration-300 ease-in-out group-hover:-translate-y-4 group-hover:scale-200 group-hover:motion-preset-wobble-lg group-hover:motion-rotate-loop-45 group-hover:motion-duration-1000/rotate group-hover:motion-duration-500/translate"
          />
        </div>
      ),
      title: "Smart Recommendations",
      description:
        "AI analyzes your mood and suggests personalized content instantly.",
    },
    {
      icon: (
        <div className="group peer inline-block cursor-pointer p-2">
          <FaBrain
            size={40}
            className="text-green-500 mb-2 transition-all duration-300 ease-in-out group-hover:-translate-y-4 group-hover:scale-200 group-hover:motion-translate-x-loop-150 group-hover:motion-rotate-loop-[360deg] group-hover:motion-ease-in-out"
          />
        </div>
      ),
      title: "Learning Abilities",
      description:
        "Our AI learns from patterns and improves its understanding over time.",
    },
    {
      icon: (
        <div className="group peer inline-block cursor-pointer p-2">
          <FaLightbulb
            size={40}
            className="text-yellow-500 mb-2 transition-all duration-300 ease-in-out group-hover:-translate-y-4 group-hover:scale-200 group-hover:-rotate-12 group-hover:motion-opacity-loop-50 group-hover:motion-duration-[1s]"
          />
        </div>
      ),
      title: "Creative Ideas",
      description:
        "It can generate ideas, advice, or even tiny stories based on your mood.",
    },
    {
      icon: (
        <div className="group peer inline-block cursor-pointer p-2">
          <FaSmile
            size={40}
            className="text-pink-500 mb-2 transition-all duration-100 ease-in-out group-hover:-translate-y-4 group-hover:motion-preset-stretch-lg"
          />
        </div>
      ),
      title: "Mood Detection",
      description:
        "It detects your current mood in real-time to give more relevant suggestions.",
      isGoldText: true,
    },
  ];

  return (
    <section className="bg-neutral-100 p-6 rounded-3xl mt-8 shadow-md text-center mb-40 sm:mb-25 xl:mb-0 motion-preset-slide-down motion-duration-1000">
      <h2 className="text-2xl font-bold mb-6">Cool Things AI Can Do</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {facts.map((fact, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            {fact.icon}
            <h3
              className={`font-semibold text-lg mb-2 transition-all duration-300`}
            >
              {fact.title}
            </h3>
            <p className="text-gray-600 text-sm">{fact.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FactsAboutAI;