import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import SearchSlice from './SearchSlice'

export const AppStore = configureStore({
    reducer: {
        auth : AuthSlice,
        search : SearchSlice
    },
})

export type RootState = ReturnType<typeof AppStore.getState>

export type AppDispatch = typeof AppStore.dispatch