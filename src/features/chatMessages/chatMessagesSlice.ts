import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loadMessages= createAsyncThunk(
    'chatMessages/loadMessages',
    async (arg: string, thunkAPI) => {
        const fd=new FormData();
        fd.append('roomname',arg );
        const response= await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/chats`,{
            method:'POST',
            headers:{
              'Access-Control-Allow-Origin':'*',
              'x-access-tokens': `${localStorage.getItem('flackwebToken')}`
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

type Message={
    dttm:string,
    message: string,
    mid:number,
    room: string,
    room_id:string,
    user:string
}

type ChatMessagesType={ 
    [channel:string]:Array<Message>
}

let initialState: ChatMessagesType={};

export const chatMessagesSlice=createSlice({
    name: 'chatMessages',
    initialState,
    reducers: {
        addNewMessages: ( state:ChatMessagesType, action: PayloadAction<{channel:string, messages:Array<Message>}> ) => {
            state[action.payload.channel].push( ...action.payload.messages );
        },
        addOldMessages: ( state:ChatMessagesType, action: PayloadAction<{channel:string, messages:Array<Message>}> ) => {
            state[action.payload.channel].unshift(...action.payload.messages);
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(loadMessages.fulfilled, ( state: ChatMessagesType, action: PayloadAction<{channel:string, messages:Array<Message>}> ) => {
            state[action.payload.channel]=action.payload.messages;
        })
    }
})

export const {addNewMessages, addOldMessages } =chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
