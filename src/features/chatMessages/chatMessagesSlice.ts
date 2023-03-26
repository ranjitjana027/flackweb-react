import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatMessagesType, Message} from "./types";

export const loadMessages = createAsyncThunk(
    'chatMessages/loadMessages',
    async (arg: { room: string, isChannel: boolean}, thunkAPI) => {
        const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/chats/${arg.room}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('flackwebToken')}`
            }
        });
        const data = await response.json();
        return {
            channel: arg.room,
            messages: data.chats
        }
    }
)



const initialState: ChatMessagesType = {};

export const chatMessagesSlice = createSlice({
    name: 'chatMessages',
    initialState,
    reducers: {
        addNewMessages: (state: ChatMessagesType, action: PayloadAction<{ channel: string, messages: Array<Message> }>) => {
            if (!state[action.payload.channel]) {
                state[action.payload.channel] = []
            }
            state[action.payload.channel].push(...action.payload.messages);
        },
        addOldMessages: (state: ChatMessagesType, action: PayloadAction<{ channel: string, messages: Array<Message> }>) => {
            if (!state[action.payload.channel]) {
                state[action.payload.channel] = []
            }
            state[action.payload.channel].unshift(...action.payload.messages);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadMessages.fulfilled, (state: ChatMessagesType, action: PayloadAction<{ channel: string, messages: Array<Message> }>) => {
            state[action.payload.channel] = action.payload.messages;
        })
    }
})

export const {addNewMessages, addOldMessages} = chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
