import { createSlice } from "@reduxjs/toolkit"

export const chatMessagesSlice=createSlice({
    name: 'chatMessages',
    initialState: {},
    reducers: {
        loadMessages: (state,action) => {
            state[action.payload.channel]=action.payload.messages;
        },
        addNewMessages: ( state, action ) => {
            state[action.payload.channel].push( ...action.payload.messages );
        },
        addOldMessages: ( state, action ) => {
            state[action.payload.channel].unshift(...action.payload);
        }
    }
})

export const { loadMessages, addNewMessages } =chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;