"use client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { FC, useContext, useState, useEffect } from "react"; 
import { Context } from "../StoreProvider";
import { observer } from "mobx-react-lite";
import Confetti from "react-confetti"; 
import { useRouter } from "next/navigation";


interface Values {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const { store } = useContext(Context);
  const router= useRouter()

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; 

    const detectSize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, []);

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    store.setIsLoading(true);
    try {
      await store.login(values.email, values.password);
      if (store.isAuth) {
        store.setLoginModalOpen(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        router.push("/dashboard") 
      }
    } catch (e) {
      console.error("Login failed:", e);
    } finally {
      setSubmitting(false);
      store.setIsLoading(false);
    }
  };

  const handleLoginClick = (event: React.MouseEvent) => {
    event.preventDefault();
    store.setRegistrationModalOpen(true);
    store.setLoginModalOpen(false);
  };

  const handleCloseClick = () => {
    store.setLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 motion-preset-slide-down-right motion-duration-1000">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className="relative flex flex-col items-center justify-center gap-5 m-auto w-80 bg-neutral-100 p-6 rounded-lg shadow-md sm:w-100">
          <button
            type="button"
            onClick={handleCloseClick}
            className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="font-bold">Let’s make the world better 🌍✨</h2>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="email"
              type="email"
              className="p-3 rounded-4xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>
          <div className="flex flex-col relative"> 
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="password"
              type={showPassword ? "text" : "password"} 
              className="p-3 rounded-4xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 ex items-center justify-center  " 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" !mt-2.5 flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700" 
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 flex items-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.981 18.75A9.75 9.75 0 0112 15.75c3.24 0 6.22-.971 8.799-2.65l-2.784-2.784a12.723 12.723 0 00-1.742-.716l-3.213 3.213L15 15.75H9l-3.213-3.213L4.22 13.097c-.017.067-.034.135-.05.204a9.73 9.73 0 01-1.85 2.112v.167zm-3.13-4.576l-.427-.225a9.742 9.742 0 01-.177-1.127l-.025-.262L2.015 10.75A9.736 9.736 0 0112 7.5a9.736 9.736 0 019.985 3.25l1.012 1.97-.025.262a9.742 9.742 0 01-.177 1.127l-.427.225-.97-.97-.225-.427A8.254 8.254 0 0012 11.25a8.254 8.254 0 00-7.702 4.224l-.225.427-.97.97z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="flex-shrink-0 ml-2 px-6 py-3 rounded-4xl w-30 items-center justify-center font-bold bg-amber-200 hover:bg-amber-300 focus:bg-amber-300 transition-colors duration-300 ease-in-out"
          >
            Submit
          </button>
          <a
            href="#"
            onClick={handleLoginClick}
            className="hover:underline focus:underline transition-all duration-300 ease-in-out"
          >
            Not registered? Sign up now!
          </a>
        </Form>
      </Formik>
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
          tweenDuration={3000} 
        />
      )}
    </div>
  );
};

export default observer(LoginForm);