import Head from "next/head";
import Link from "next/link";
import { User } from "@/interfaces";
import { useGetUsersQuery, useLazyGetUsersQuery } from "@/services/users.service";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";

export default function Users() {
  const [page, setPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [refresh, { data }] = useLazyGetUsersQuery();

  const filter = {firstName, lastName, city, age, gender};

  useEffect(() => {
    refresh({page, ...filter});
  }, [page, firstName, lastName, city, age, gender]);



  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <section className="mx-10">
        <div className="flex pb-4">
          <div className="flex space-x-10 w-3/4">
            <div>
              <label className="block mb-2 font-medium">First Name</label>
              <input name="first_name" id="first_name" onChange={(e) => setFirstName(e.target.value)} className="border rounded-lg p-1.5 bg-gray-700 border-gray-600" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Last Name</label>
              <input name="last_name" id="last_name" onChange={(e) => setLastName(e.target.value)} className="border rounded-lg p-1.5 bg-gray-700 border-gray-600" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Age</label>
              <input type="number" name="age" id="age" onChange={(e) => setAge(parseInt(e.target.value))}  className="border rounded-lg p-1.5 w-16 bg-gray-700 border-gray-600" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Gender</label>
              <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)} className="border rounded-lg p-1.5 bg-gray-700 border-gray-600">
                <option selected></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">City</label>
              <input name="city" id="city" onChange={(e) => setCity(e.target.value)} className="border rounded-lg p-1.5 bg-gray-700 border-gray-600" />
            </div>

          </div>

          <div className="flex flex-1 justify-end">
            <Link href={"/users/new"} className="w-28 h-10 self-end">
              <button type="submit"
                className="rounded-md w-full bg-green-600 py-2 px-4 text-center text-base font-semibold">
                Create
              </button>
            </Link>
          </div>
        </div>
        <table className="bg-gray-900/60 rounded-md">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-stone-200 text-center">Username</th>
              <th className="text-stone-200 text-center">First Name</th>
              <th className="text-stone-200 text-center">Last Name</th>
              <th className="text-stone-200 text-center">Age</th>
              <th className="text-stone-200 text-center">Gender</th>
              <th className="text-stone-200 text-center">City</th>
              <th className="text-stone-200 text-center">Email</th>
              <th className="text-stone-200 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {data && data.results.map((user: User) => (
              <tr key={user.id}>
                <td data-label="Username" className="text-sm text-white font-semibold text-center">
                  <Link href={`/users/${user.id}`}>
                    {user.username}
                  </Link>
                </td>
                <td data-label="First Name" className="text-sm text-stone-200 text-center">
                  {user.first_name}
                </td>
                <td data-label="Last Name" className="text-sm text-stone-200 text-center">
                  {user.last_name}
                </td>
                <td data-label="Age" className="text-sm text-stone-200 text-center">
                  {user.profile.age}
                </td>
                <td data-label="Gender" className="text-sm text-stone-200 text-center">
                  {user.profile.gender}
                </td>
                <td data-label="city" className="text-sm text-stone-200 text-center">
                  {user.profile.city}
                </td>
                <td data-label="Email" className="text-sm text-stone-200 text-center">
                  {user.email}
                </td>
                <td>
                  <Link href={`users/${user.id}`}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center p-3 lg:px-6 border-t border-stone-800">
          {/* Pagination */}
          {data &&
            <Pagination count={data.count} page={page} setPage={setPage} />
          }
        </div>
      </section>
    </>
  );
}
