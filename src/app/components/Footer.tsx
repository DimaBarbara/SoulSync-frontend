import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 motion-preset-slide-down motion-duration-1000 rounded-3xl mt-8 shadow-md fixed bottom-5 inset-x-0 mx-auto w-[98%] p-4 ">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-2">
        <div className="text-gray-700 font-semibold">© 2025 Soul Sync</div>
        <div className="flex gap-4 text-gray-600">
          <a
            href="https://github.com/dimabarbara"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              size={24}
              className="hover:text-black transition-colors"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/dmytro-barbara/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              size={24}
              className="hover:text-blue-600 transition-colors"
            />
          </a>
          <a href="mailto:dmytrobarbara1@gmail.com">
            <FaEnvelope
              size={24}
              className="hover:text-red-500 transition-colors"
            />
          </a>
        </div>
        <div className="text-gray-500 text-sm">Made with love ❤️</div>
      </div>
    </footer>
  );
};

export default Footer;
