import { useDeleteUserMutation, useLazyGetUserQuery, useUpdateUserMutation } from "@/services/users.service";
import { Field, Form, Formik, FormikValues } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserPage() {
    const router = useRouter();

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [getUser, { data, isLoading, error }] = useLazyGetUserQuery();

    useEffect(() => {
        if (router.isReady && router.query.id) {
            getUser(router.query.id.toString());
        }
    }, [router.isReady]);


    const handleUpdate = (values: FormikValues) => {
        if (!data) {
            return;
        }
        const { username, first_name, last_name, email, city, age, gender } = values;

        updateUser({ id: data.id, username, first_name, last_name, email, profile: {city, age, gender} })
            .unwrap()
            .then(() => {
                // Maybe a toast to confirm...
            });
    }

    const handleDelete = () => {
        if (!data) {
            return;
        }
        deleteUser(data.id)
            .unwrap()
            .then(() => {
                // Same here :D
                router.push('/users');
            })
    }
    return (
        <>
            <Head>
                <title>User: {data ? data.id: "Loading"}</title>
            </Head>
            {!isLoading && data && (
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[600px]">
                        <Formik initialValues={{
                            username: data.username,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                            city: data.profile.city,
                            gender: data.profile.gender,
                            age: data.profile.age,
                        }}
                        onSubmit={(values) => handleUpdate(values)}>
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
                                                <option value="unknown">Unknown</option>
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

                                <div className="flex flex-wrap">
                                    <div className="w-1/2 pr-4">
                                        <button type="submit" disabled={isUpdating}
                                            className="w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold">
                                            Update
                                        </button>
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <button type="submit" onClick={handleDelete} disabled={isDeleting}
                                            className="w-full rounded-md bg-red-700 py-3 px-8 text-center text-base font-semibold">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

            )}
        </>
    )
} 