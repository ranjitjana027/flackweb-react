import { createSlice } from "@reduxjs/toolkit";

export const groupSearchSlice=createSlice({
    name: 'groupSearch',
    initialState: {},
    reducers: {
        addSearchResult: (state, action) => {
            state[action.payload.title.toLowerCase() ]=action.payload.matches
        }
    }
})

export const selectAllSearchKeys=(state)=>{
    return Object.keys(state.groupSearch);
}

export const { addSearchResult } = groupSearchSlice.actions;
export default groupSearchSlice.reducer;