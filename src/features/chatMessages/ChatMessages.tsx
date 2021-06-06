import React, { useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Header, MessageList } from '../../components/chat';
import { useSocket } from '../../hooks/use-socket';
import ChatBox from './ChatBox';
import { selectActiveChannels } from '../allChannels/allChannelsSlice';
import { addNewMessages, loadMessages } from './chatMessagesSlice';
import { updateLastMessage } from '../allChannels/allChannelsSlice';
import '../../stylesheets/chat/chat_messages.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export default function ChatMessages(){
    const {channel}: { channel: string }=useParams();
    const dispatch=useAppDispatch();
    const messages=useAppSelector (state=> state.chatMessages[channel.slice(1)]);
    const channel_info=useAppSelector (state=> {
        if (typeof state.allChannels.channels=='boolean'){
            return false;
        }
        return state.allChannels.channels[channel.slice(1)];
    });
    const activeChannels=useAppSelector(selectActiveChannels);
    const socket=useSocket();
    const auth=useAppSelector(state=>state.auth);
    const history=useHistory();

    useEffect(() => {
        if(!messages){
            dispatch(loadMessages(channel.slice(1)));
        }
    },[channel, messages, dispatch]);

    useEffect(()=>{
        if(socket!=null){
            const receiveMessageListener=(data:any) => {
                dispatch(addNewMessages({
                    channel:data.room_id,
                    messages: [data]
                }));
                dispatch(updateLastMessage({
                    channel_id:data.room_id,
                    last_message: data
                }));

            };

            socket.on('receive message', receiveMessageListener);
            return ()=>{
                socket.offAny(receiveMessageListener);
            }
        }
    }, [socket, dispatch]);




    const exitGroup=()=>{
        if(socket!=null){
            socket.emit('leave',{
            room: channel.slice(1) 
            });
        }
        history.push("/");
    }

    if(!activeChannels){
        return (<div style={{fontSize:'larger'}}>Loading...</div>)
    }


    if( activeChannels && !activeChannels.includes(channel.slice(1))){
        return (<div>
            Join first to see chat messages
        </div>)
    }

    return (
        <Fragment>
            <Header
            channel_info={channel_info}
            exitGroup={exitGroup} />
            <MessageList
            className="message-list"
            messages={messages}
            auth={auth} />
            <ChatBox
            room={channel.slice(1) } />
        </Fragment>
    );
}
