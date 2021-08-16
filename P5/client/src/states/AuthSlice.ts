import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState{
    authenticated : boolean
}

const initialState: AuthState = {
    authenticated : false
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.authenticated = action.payload
        },
    },
})

export const { setAuthenticated } = AuthSlice.actions

export default AuthSlice.reducer