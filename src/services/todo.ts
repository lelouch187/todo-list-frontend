// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Todo} from "../types/todo.ts";


// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getAllTodos: builder.query<Todo[], string>({
            query: () => '/',
            providesTags: ['Todo'],
        }),
        addTask: builder.mutation<Todo, Todo>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Todo'],
        }),
    }),
})

export const { useGetAllTodosQuery, useAddTaskMutation } = todoApi