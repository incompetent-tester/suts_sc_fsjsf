import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchState{
    value : string
}

const initialState: SearchState = {
    value : ''
}

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
})

export const { setSearch } = SearchSlice.actions

export default SearchSlice.reducer