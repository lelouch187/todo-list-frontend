import { configureStore } from '@reduxjs/toolkit'
import {todoApi} from "./services/todo.ts";
import {setupListeners} from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware),
})

setupListeners(store.dispatch)