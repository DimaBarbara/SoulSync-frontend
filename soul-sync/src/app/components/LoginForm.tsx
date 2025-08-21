'use client'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'

interface Values {
    email: string;
    password: string;
}
const LoginForm: FC = () => {
     const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        console.log('aa')
    }
  return (
    <Formik
    initialValues={{
        email: '',
        password: '',
    }}
    onSubmit={handleSubmit}>
        <Form className='flex flex-col items-center justify-center gap-5 m-auto w-96 bg-gradient-to-r bg-animated-gradient p-6 rounded-lg border border-indigo-300'>
            <h2 className='font-bold'>Let’s make the world better 🌍✨</h2>
          <div className='flex flex-col'> 
            <label htmlFor='email'>Email</label>
            <Field id='email' name='email' placeholder='email' type="email" className="bg-blue-100 rounded-lg p-2 border border-black transition-colors duration-300 ease-in-out hover:bg-blue-200 input-bounce"/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <Field id='password' name='password' placeholder='password' type="password" className="bg-blue-100 rounded-lg p-2 border border-black transition-colors duration-300 ease-in-out hover:bg-blue-200 input-bounce"/>
          </div >
            <button type="submit" className='border border-black bg-blue-100 p-2 rounded-lg w-40 hover:bg-blue-200 transition-colors duration-300 ease-in-out input-bounce'>Submit</button>
            <a href='' className='hover:underline focus:underline transition-all duration-300 ease-in-out'>Not registered? Sign up now!</a>
        </Form>

    </Formik>
  )
}

export default LoginForm

