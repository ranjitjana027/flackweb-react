import {configureStore} from '@reduxjs/toolkit';
import authReducer, {autoSignin} from '../features/auth/authSlice';
import allChannelsReducer from '../features/allChannels/allChannelsSlice';
import chatMessagesReducer from '../features/chatMessages/chatMessagesSlice';
import directMessage from '../features/directMessage/directMessageSlice'
import groupSearchReducer from '../features/groupSearch/groupSearchSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        allChannels: allChannelsReducer,
        chatMessages: chatMessagesReducer,
        directMessage: directMessage,
        groupSearch: groupSearchReducer
    }
});

store.dispatch(autoSignin());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
