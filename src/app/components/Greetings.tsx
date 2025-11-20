import React, { useContext } from "react";
import { Context } from "../StoreProvider";
import { useRouter } from "next/navigation";

const Greetings = () => {
    const { store } = useContext(Context);
    const router = useRouter()
  const handleClick = () => {
    if (store.isAuth) {
      router.push("/dashboard")
    } else {
      store.setRegistrationModalOpen(true) 
    }
}
  return (
    <section
      id="Greetings"
      className="bg-neutral-100 rounded-3xl mt-8 shadow-md flex flex-col items-center text-center h-95 sm:h-70 xl:h-80 text-xl motion-preset-slide-down motion-duration-1000"
    >
      <div className="p-6 h-full flex flex-col items-center text-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-1 sm:mb-4">Hello! 👋</h1>
        <p className="text-lg max-w-xl mb-2 sm:mb-4">
          Welcome to Soul Sync — a place where ideas and creativity meet. Here,
          you can get inspired, discover interesting projects, and share your
          own work with the world.
        </p>
        <p className="text-sm text-gray-500 mb-2 sm:mb-6 sm:text-xs xl:text-sm">
          This project is built for practice and experimenting with React,
          Tailwind, and Next.js.
        </p>
          <button onClick={handleClick} className="bg-blue-500 text-white text-sm sm:text-xl px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
            Start Exploring
          </button>
      </div>
    </section>
  );
};

export default Greetings;
