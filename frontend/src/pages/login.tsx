import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '@/stores/store';
import { useLoginMutation } from '@/services/auth.service';
import { selectCurrentUser, setCredentials } from '@/stores/authSlice';
import Head from 'next/head';

const Login = () => {
  const router = useRouter()
  const user = useSelector(selectCurrentUser)
  const [error, setError] = useState<string>();

  const [login, { isLoading }] = useLoginMutation()

  const initialValues = {
    username: '',
    password: '',
  }

  const dispatch = useDispatch<AppThunkDispatch>()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [dispatch])


  const handleLogin = async (values: { username: string, password: string }) => {
    try {
      const user = await login(values).unwrap()
      dispatch(setCredentials(user))
      router.push('/')
    } catch (err) {
      setError("Incorrect username and/or password.")
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border sm:max-w-md bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sign in
              </h1>
              <Formik initialValues={initialValues} onSubmit={(values) => handleLogin(values)}>
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block mb-2 font-medium">Username</label>
                    <Field name="username" id="username" className="border rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="admin..." required />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Password</label>
                    <Field name="password" type="password" required placeholder="••••••••" className="border rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Log in</button>
                </Form>
              </Formik>
              {error && (
                <div className={"text-red-400"}>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;