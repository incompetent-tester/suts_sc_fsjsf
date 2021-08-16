import { configureStore } from '@reduxjs/toolkit'
import UISlice from './UISlice'

export const AppStore = configureStore({
    reducer: {
        ui : UISlice
    },
})

export type AppRootState = ReturnType<typeof AppStore.getState>

export type AppDispatch = typeof AppStore.dispatch