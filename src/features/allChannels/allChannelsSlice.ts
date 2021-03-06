import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Channel, ChannelList} from "./types";
import {Message} from "../chatMessages/types";


export const loadChannels = createAsyncThunk(
    'allChannels/loadChannels',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/channel_list`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'x-access-tokens': `${localStorage.getItem('flackwebToken')}`
            }
        });
        const data = await response.json();
        if (data.success) {
            const channels: ChannelList = {};
            for (const channel of data.channels) {
                channels[channel.channel_id] = channel;
                channels[channel.channel_id].isMember = true;
            }
            return channels;
        } else {
            return false;
        }
    }
)

const pending = (state: AllChannelsType) => {
    state.isLoading = true;
    state.hasError = false;
}

const rejected = (state: AllChannelsType) => {
    state.isLoading = false;
    state.hasError = true;
}

type AllChannelsType = {
    channels: boolean | ChannelList,
    isLoading: boolean,
    hasError: boolean
}

export const allChannelsSlice = createSlice({
    name: 'allChannels',
    initialState: {
        channels: false,
        isLoading: false,
        hasError: false
    } as AllChannelsType,
    reducers: {
        addChannel: (state: AllChannelsType, action: PayloadAction<Channel>) => {
            if (typeof state.channels != "boolean")
                state.channels[action.payload.channel_id] = action.payload;
        },
        removeChannel: (state: AllChannelsType, action: PayloadAction<string>) => {
            if (typeof state.channels != "boolean")
                state.channels[action.payload].isMember = false;
        },
        updateLastMessage: (state: AllChannelsType, action: PayloadAction<{ channel_id: string, last_message: Message }>) => {
            if (typeof state.channels != "boolean")
                state.channels[action.payload.channel_id].last_message = action.payload.last_message;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadChannels.pending, pending);
        builder.addCase(loadChannels.rejected, rejected);
        builder.addCase(loadChannels.fulfilled, (state: AllChannelsType, action: PayloadAction<ChannelList | boolean>) => {
            state.channels = action.payload;
        });
    }
})

export const selectAllChannels = (state: RootState) => {
    if (state.allChannels.channels)
        return Object.values(state.allChannels.channels).sort((b, a) => (new Date(a.last_message ? a.last_message.timestamp : a.created_on)).valueOf() - (new Date(b.last_message ? b.last_message.timestamp : b.created_on)).valueOf());
    return false;
}

export const selectActiveChannels = (state: RootState) => {
    if (state.allChannels.channels)
        return Object.values(state.allChannels.channels).filter(item => item.isMember).map(item => item.channel_id);
    return false;
}

export const {addChannel, removeChannel, updateLastMessage} = allChannelsSlice.actions;
export default allChannelsSlice.reducer;
