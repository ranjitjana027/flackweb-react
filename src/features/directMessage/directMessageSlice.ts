import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import { Message } from "../chatMessages/types";
import {DirectMessageState, User, UserList} from "./types";



export const loadConnectedUsers = createAsyncThunk(
    'directMessage/loadConnectedUsers',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/connections/list`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'x-access-tokens': `${localStorage.getItem('flackwebToken')}`
            }
        });
        const data = await response.json();
        const userList: UserList = {};
        if (data.success) {
            for (const user of data.connection_list) {
                userList[user.username] = user;
            }
        }
        return userList;
    }
)


export const directMessageSlice = createSlice({
    name: 'directMessage',
    initialState: {
        searchResults: {},
        userList: {}
    } as DirectMessageState,
    reducers: {
        addSearchResult: (state, action) => {
            const title = action.payload.title.toLowerCase();
            const userList = action.payload.matches;
            state.searchResults[title] = userList;
            // userList.forEach( (user: User) => {
            //     state.userList[user.username] = user;
            // })
        },
        addUser: (state: DirectMessageState, action: PayloadAction<User>) => {
            if (typeof state.userList != "boolean")
                state.userList[action.payload.username] = action.payload;
        },
        updateLastMessage: (state: DirectMessageState, action: PayloadAction<{ channel_id: string, last_message: Message }>) => {
            if (typeof state.userList != "boolean")
                state.userList[action.payload.channel_id].lastMessage = action.payload.last_message;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadConnectedUsers.fulfilled, (state: DirectMessageState, action: PayloadAction<UserList>) => {
            state.userList = action.payload;
            console.log("running")
        });
    }
})

export const selectAllSearchKeys = (state: RootState) => {
    return Object.keys(state.groupSearch);
}

export const selectConnectedUsers = (state: RootState) => {
    return Object.values(state.directMessage.userList)
        .sort((b, a) => {
            if( b.lastMessage && a.lastMessage) {
                return (new Date(`${a.lastMessage.timestamp}`).valueOf()) - (new Date(`${b.lastMessage.timestamp}`).valueOf());
            }
            return b.display_name.localeCompare(a.display_name);
        });
}

export const {addSearchResult, addUser, updateLastMessage} = directMessageSlice.actions;
export default directMessageSlice.reducer;