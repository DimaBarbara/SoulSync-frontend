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
        <Form className='flex flex-col items-center justify-center gap-10 m-auto w-96 bg-rose-500 p-6 rounded-lg'>
          <div className='flex flex-col'> 
            <label htmlFor='email'>Email</label>
            <Field id='email' name='email' placeholder='email' type="email"/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <Field id='password' name='password' placeholder='password' type="password"/>
          </div >
            <button type="submit">Submit</button>
        </Form>

    </Formik>
  )
}

export default LoginForm
