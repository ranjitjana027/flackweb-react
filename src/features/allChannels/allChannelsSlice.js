import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadChannels= createAsyncThunk(
    'allChannels/loadChannels',
    async () => {
        const response= await fetch('/api/channel_list',{
            method: 'POST'
        });
        const data = await response.json();
        if(data.success){
            const channels={};
            for(let channel of data.channels){
                channels[channel.channel_id]=channel;
                channels[channel.channel_id].isMember=true;
            }
            return channels;
        }
        else{
            return false;
        }
    }
)

const pending = state => {
    state.isLoading=true;
    state.hasError= false;
}

const rejected = state => {
    state.isLoading=false;
    state.hasError=true;
}

export const allChannelsSlice=createSlice({
    name:'allChannels',
    initialState: {
        channels: false,
        isLoading: false,
        hasError: false
    },
    reducers: {
        addChannel: (state,action) => {
            state.channels[action.payload.channel_id]=action.payload;
        },
        removeChannel: (state,action) => {
            state.channels[action.payload].isMember=false;
        },
        updateLastMessage: (state, action ) => {
            state.channels[action.payload.channel_id].last_message=action.payload.last_message;
        }
    },
    extraReducers: {
        [loadChannels.pending]: pending,
        [loadChannels.rejected]: rejected,
        [loadChannels.fulfilled]: (state,action) => {
            state.channels=action.payload;
        }
    }
})

export const selectAllChannels= state=> {
    if(state.allChannels.channels)
        return Object.values(state.allChannels.channels).sort((b,a)=>new Date(a.last_message?a.last_message.dttm:a.created_on)-new Date(b.last_message?b.last_message.dttm:b.created_on));
    return false;
}

export const selectActiveChannels=state => {
    if(state.allChannels.channels)
        return Object.values(state.allChannels.channels).filter(item => item.isMember).map(item=>item.channel_id);
    return false;
}

export const { addChannel, removeChannel, updateLastMessage } = allChannelsSlice.actions; 
export default allChannelsSlice.reducer;

