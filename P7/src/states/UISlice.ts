import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState{
    loading : boolean
    authenticated : boolean
}

const initialState: UIState = {
    loading : false,
    authenticated : false
}

const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.loading = true
        },
        closeLoading: (state) => {
            state.loading = false
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.authenticated = action.payload
        }
    },
})

export const { showLoading, closeLoading, setAuthenticated } = UISlice.actions

export default UISlice.reducer