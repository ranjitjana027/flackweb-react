import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadMessages= createAsyncThunk(
    'chatMessages/loadMessages',
    async (arg, thunkAPI) => {
        const fd=new FormData();
        fd.append('roomname',arg );
        const response= await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/chats`,{
            method:'POST',
            headers:{
              'Access-Control-Allow-Origin':'*',
              'x-access-tokens': localStorage.getItem('flackwebToken')
            },
            body:fd
        });
        const data= await response.json();
        return {
            channel: arg,
            messages: data.message
        }
    }
)

export const chatMessagesSlice=createSlice({
    name: 'chatMessages',
    initialState: {},
    reducers: {
        addNewMessages: ( state, action ) => {
            state[action.payload.channel].push( ...action.payload.messages );
        },
        addOldMessages: ( state, action ) => {
            state[action.payload.channel].unshift(...action.payload);
        }
    },
    extraReducers: {
        [loadMessages.fulfilled]: ( state, action ) => {
            state[action.payload.channel]=action.payload.messages;
        }
    }
})

export const {addNewMessages, addOldMessages } =chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
