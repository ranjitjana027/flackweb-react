import { configureStore } from '@reduxjs/toolkit';
import authReducer, { autoSignin } from '../features/auth/authSlice';
import allChannelsReducer from '../features/allChannels/allChannelsSlice';
import chatMessagesReducer from '../features/chatMessages/chatMessagesSlice';
import groupSearchReducer from '../features/groupSearch/groupSearchSlice';

const store=configureStore({
    reducer: {
        auth: authReducer,
        allChannels: allChannelsReducer,
        chatMessages: chatMessagesReducer,
        groupSearch: groupSearchReducer
    }
});

store.dispatch(autoSignin());

export default store;
