'use client'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { FC, useContext } from 'react'
import { Context } from '../StoreProvider';
import { observer } from 'mobx-react-lite';


interface Values {
    email: string;
    password: string;
}
const RegisterForm: FC = () => {
     const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        await store.registration(values.email, values.password)
        if(store.isAuth) {
           store.setRegistrationModalOpen(false)
           console.log("isAuth",store.isAuth)
        }
          setSubmitting(false);
    }
    const {store} = useContext(Context)

    const handleRegisterClick = (event : React.MouseEvent) => {
      event.preventDefault();
      store.setLoginModalOpen(true)
      store.setRegistrationModalOpen(false)
    }
    const handleCloseClick = () => {
      store.setRegistrationModalOpen(false)
    }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
    <Formik
    initialValues={{
        email: '',
        password: '',
    }}
    onSubmit={handleSubmit}>
        <Form className=' relative flex flex-col items-center justify-center gap-5 m-auto w-80  bg-neutral-100 p-6 rounded-lg shadow-md sm:w-100'>
           <button
                type="button"
                onClick={handleCloseClick}
                className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className='font-bold'>Let’s make the world better 🌍✨</h2>
          <div className='flex flex-col'> 
            <label htmlFor='email'>Email</label>
            <Field id='email' name='email' placeholder='email' type="email" className="p-3 rounded-4xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <Field id='password' name='password' placeholder='password' type="password" className="p-3 rounded-4xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"/>
          </div >
            <button type="submit" className='flex-shrink-0 ml-2 px-6 py-3 rounded-4xl w-30 items-center justify-center font-bold bg-amber-200 hover:bg-amber-300 focus:bg-amber-300 transition-colors duration-300 ease-in-out'>Submit</button>
            <a href='#'
               onClick={handleRegisterClick}
               className='hover:underline focus:underline transition-all duration-300 ease-in-out'
               >
                Already registered? Sign In!
                </a>
        </Form>
    </Formik>
  </div>
  )
}

export default observer(RegisterForm) 

