import { createSlice } from "@reduxjs/toolkit";

type GroupSearchState={
    [title:string]:any
}

export const groupSearchSlice=createSlice({
    name: 'groupSearch',
    initialState: {} as GroupSearchState,
    reducers: {
        addSearchResult: (state, action) => {
            state[action.payload.title.toLowerCase() ]=action.payload.matches
        }
    }
})

export const selectAllSearchKeys=(state:GroupSearchState)=>{
    return Object.keys(state.groupSearch);
}

export const { addSearchResult } = groupSearchSlice.actions;
export default groupSearchSlice.reducer;