import React, { useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Header, MessageList } from '../../components/chat';
import { useSocket } from '../../hooks/use-socket';
import ChatBox from './ChatBox';
import { selectActiveChannels } from '../allChannels/allChannelsSlice';
import { loadMessages } from './chatMessagesSlice';
import '../../stylesheets/chat/chat_messages.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ChannelDetails from "../../components/chat/ChannelDetails";

export default function ChatMessages(){
    const {channel}: { channel: string } = useParams();
    const dispatch = useAppDispatch();
    const messages = useAppSelector (state=> state.chatMessages[channel.slice(1)]);
    const channel_info = useAppSelector (state => {
        if (typeof state.allChannels.channels === 'boolean'){
            return false;
        }
        return state.allChannels.channels[channel.slice(1)];
    });
    const activeChannels = useAppSelector(selectActiveChannels);
    const socket = useSocket();
    const auth = useAppSelector(state=>state.auth);
    const history = useHistory();

    const [openChannelDetails, setOpenChanelDetails] = React.useState<boolean>(false);

    const handleCloseChannelDetails = () => {
        setOpenChanelDetails(false);
    }

    const toggleChannelDetails = () => {
        setOpenChanelDetails(openChanelDetails => !openChanelDetails);
    }


    useEffect(() => {
        if(!messages){
            dispatch(loadMessages(channel.slice(1)));
        }
    },[channel, messages, dispatch]);

    const goBack = () => {
        history.goBack();
    }


    const exitGroup = () => {
        if(socket !== null){
            socket.emit('leave',{
            room: channel.slice(1) 
            });
        }
        history.push("/");
    }

    if(!activeChannels){
        return (<div className="initial" style={{fontSize:'larger'}}>Loading...</div>);
    }


    if( activeChannels && !activeChannels.includes(channel.slice(1))){
        return (
            <div className="initial">
                Join first to see chat messages
            </div>
        );
    }

    return (
        <Fragment>
            <Header
                channel_info = { channel_info }
                goBack = { goBack }
                exitGroup = { exitGroup }
                toggleChannelDetails = { toggleChannelDetails }
            />
            <ChannelDetails
                channelDetails = { channel_info }
                openChannelDetails = { openChannelDetails }
                handleCloseChannelDetails = { handleCloseChannelDetails }
            />
            <MessageList
                className = { "message-list" }
                messages = {messages}
                auth = {auth}
            />
            <ChatBox
                room = {channel.slice(1) }
            />
        </Fragment>
    );
}
