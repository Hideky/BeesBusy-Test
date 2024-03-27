import { API_URL } from '../config'
import {
  buildCreateApi,
  coreModule,
  fetchBaseQuery,
  reactHooksModule,
} from '@reduxjs/toolkit/query/react'
import type { RootState } from '../stores/store'
import { User } from '../interfaces'

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
)


interface ListResponse<T> {
  count: number
  next: string
  previous: string
  results: T[]
}

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            // Set token for every endpoints.
            if (token) {
                headers.set("Authorization", `Token ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        // List
        getUsers: build.query<
            ListResponse<User>,
            {
                page: number;
                firstName: string;
                lastName: string;
                age: number;
                city: string;
                gender: string;
            }
        >({
            query: ({ page, firstName, lastName, age, city, gender }) =>
                `users?page=${page}&first_name=${firstName}&last_name=${lastName}&profile__age=${
                    age > 0 ? age : ""
                }&profile__city=${city}&profile__gender=${gender}`,
                // Should find a better way to handle it :/
        }),

        getUser: build.query<User, string>({
            query: (id) => `users/${id}/`,
            // providesTags: (result, error, id) => [{ type: 'Post', id }],
        }),

        // Retrieve
        addUser: build.mutation<User, Partial<User>>({
            query: (body) => ({
                url: `users/`,
                method: "POST",
                body,
            }),
        }),

        // Update
        updateUser: build.mutation<void, Pick<User, "id"> & Partial<User>>({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/`,
                method: "PATCH",
                body: patch,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    usersApi.util.updateQueryData("getUser", id.toString(), (draft) => {
                        Object.assign(draft, patch);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        // Delete
        deleteUser: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `users/${id}/`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useLazyGetUsersQuery,
  useLazyGetUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi
