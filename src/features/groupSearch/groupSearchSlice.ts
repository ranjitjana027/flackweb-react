import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type Message={
    dttm:string,
    message: string,
    mid:number,
    room: string,
    room_id:string,
    user:string
}

type Channel={
    channel_id:string,
    channel_name: string,
    created_on: string,
    last_message: null| Message,
    members_count: number
}


type GroupSearchState={
    [title:string]:Channel[]
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

export const selectAllSearchKeys=(state:RootState)=>{
    return Object.keys(state.groupSearch);
}

export const { addSearchResult } = groupSearchSlice.actions;
export default groupSearchSlice.reducer;