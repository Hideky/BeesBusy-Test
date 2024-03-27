import { useAddUserMutation, useDeleteUserMutation, useLazyGetUserQuery, useUpdateUserMutation } from "@/services/users.service";
import { Field, Form, Formik, FormikValues } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateUser() {
  const [addUser, { isLoading: isCreating }] = useAddUserMutation()
  const [error, setError] = useState<{data: {[key: string]: string}}>();
  const router = useRouter()

  const initialValues = {
    username: '',
    first_name: '',
    last_name: '',
    city: '',
    gender: 'male',
    age: null,
  }

  const handlePost = (values: FormikValues) => {
    const { username, first_name, last_name, email, city, age, gender } = values;

    addUser({ username, first_name, last_name, email, profile: {city, age, gender} })
      .unwrap()
      .then(() => {
        router.push('/users');
      }).catch((error) => 
        setError(error)
      )
  }

    return (
        <>
            <Head>
                <title>Create User</title>
            </Head>
            
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[600px]">
                        <Formik initialValues={initialValues}
                        onSubmit={(values) => handlePost(values)}>
                            <Form className="space-y-4 md:space-y-6">
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 w-1/2">
                                        <div>
                                            <label className="mb-1 block font-medium">First Name</label>
                                            <Field name="first_name" id="first_name" className="border rounded-lg w-full p-2.5 bg-gray-700 border-gray-600" />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 w-1/2">
                                        <div>
                                            <label className="mb-1 block font-medium">Last Name</label>
                                            <Field name="last_name" id="last_name" className="border rounded-lg w-full p-2.5 bg-gray-700 border-gray-600" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block font-medium">Username</label>
                                    <Field name="username" id="username" className="border rounded-lg w-full p-2.5 bg-gray-700 border-gray-600" />
                                </div>
                                <div className="mb-5">
                                    <label className="mb-1 block font-medium">Email</label>
                                    <Field name="email" id="email" className="border rounded-lg w-full p-2.5 bg-gray-700 border-gray-600" />
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 w-1/2">
                                        <div>
                                            <label className="mb-1 block font-medium">Gender</label>
                                            <Field as="select" name="gender" id="gender" className="border rounded-lg w-full p-2.5 bg-gray-700 border-gray-600">
                                                <option value="male" selected>Male</option>
                                                <option value="female">Female</option>
                                                <option value="unknown">Unknow</option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 w-1/2">
                                        <div>
                                            <label className="mb-1 block font-medium">Age</label>
                                            <Field type="number" min="0" name="age" id="age" className="border rounded-lg w-full p-2.5 bg-gray-700 border-gray-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label className="mb-1 block font-medium">City</label>
                                    <Field name="city" id="city" className="border rounded-lg w-full p-2.5 bg-gray-700 border-gray-600" />
                                </div>
                                {error && (
                                    <div className={"text-red-400"}>
                                    {Object.entries(error.data).map(([key, value]) => 
                                        <div key={key}>
                                            <span>{key}: </span>
                                            <span>{value}</span>
                                        </div>
                                    )}
                                    </div>
                                )}
                                <div className="flex flex-wrap">
                                    <div className="w-full">
                                        <button type="submit" disabled={isCreating}
                                            className="w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
        </>
    )
} 