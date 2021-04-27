import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Header, MessageList } from '../../components/chat';
import { useSocket } from '../../hooks/use-socket';
import ChatBox from './ChatBox';
import { selectActiveChannels } from '../allChannels/allChannelsSlice';
import { addNewMessages, loadMessages } from './chatMessagesSlice';
import { updateLastMessage } from '../allChannels/allChannelsSlice';
import '../../stylesheets/chat/chat_content.scss';

export default function ChatMessages(){
    const {channel}=useParams();
    const dispatch=useDispatch();
    const messages=useSelector(state=> state.chatMessages[channel.slice(1)]);
    const channel_info=useSelector(state=> state.allChannels.channels[channel.slice(1)]);
    const activeChannels=useSelector(selectActiveChannels);
    const socket=useSocket();
    const auth=useSelector(state=>state.auth);
    const history=useHistory();

    useEffect(() => {
        if(!messages){
            const fd=new FormData();
            fd.append('roomname',channel.slice(1) );
            fetch('/api/chats',{
                method:'POST',
                body:fd
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.success){
                    dispatch(loadMessages({
                        channel:channel.slice(1) ,
                        messages:data.message
                    }))
                }
            });
        }
    },[channel]);

    useEffect(()=>{
        socket.on(
            'receive message',
            (data) => {
                dispatch(addNewMessages({
                    channel:data.room_id,
                    messages: [data]
                }));
                dispatch(updateLastMessage({
                    channel_id:data.room_id,
                    last_message: data
                }));
                
            }
        );
    },[ socket])

    const exitGroup=()=>{
        socket.emit('leave',{
          room: channel.slice(1) 
        });
        history.push("/");
    }

    if(!activeChannels){
        return (<div>Loading...</div>)
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
