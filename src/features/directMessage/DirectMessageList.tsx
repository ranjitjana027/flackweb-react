import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSocket} from '../../hooks/use-socket';
import {addNewMessages} from '../chatMessages/chatMessagesSlice';
import ChannelLinkCard from '../../components/chat/ChannelListCard';
import '../../stylesheets/chat/channel_list.scss';
import {useAppSelector} from '../../app/hooks';
import {ThreeDotsLoader} from '../../utils/Loader';
import ChatIcon from '@material-ui/icons/Chat';
import {Chip, Divider} from "@mui/material";
import {loadConnectedUsers, selectConnectedUsers, updateLastMessage} from "./directMessageSlice";

export default function DirectMessageList() {
    const dispatch = useDispatch();
    const auth = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(loadConnectedUsers());
    }, [dispatch]);

    const socket = useSocket();
    // useEffect(() => {
    //     if (socket != null)
    //         socket.emit("initiate_dm", {
    //             room:
    //         });
    // }, [socket])
    //
    useEffect(() => {
        if (socket != null) {
            const receiveMessageListener = (data: any) => {
                dispatch(addNewMessages({
                    channel: data.room_id,
                    messages: [data]
                }));
                dispatch(updateLastMessage({
                    channel_id: data.room_id,
                    last_message: data
                }));
    
            };
    
            socket.on('receive_dm_message', receiveMessageListener);
            return () => {
                socket.offAny(receiveMessageListener);
            }
        }
    }, [socket, dispatch]);


    let connectionList = useSelector(selectConnectedUsers);


    const formatDate = (str: string) => {
        const d = new Date(str);
        const diff = (new Date()).valueOf() - d.valueOf();
        if (diff < 1000 * 3600 * 24) {
            return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', 'hour12': true});
        } else if (diff < 1000 * 3600 * 24 * 2) {
            return 'Yesterday';
        } else {
            return d.toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric'});
        }
    }

    if (!connectionList) {
        // return <div style={{ textAlign: 'center'}}>Loading</div>;
        return (
            <div style={{position: 'relative'}}>
                <ThreeDotsLoader/>
            </div>
        )
    }
    // if (connectionList && connectionList.length === 0) {
    //     return <div style={{textAlign: 'center'}}>Join A Channel First</div>
    // }


    return (
        <ul className="channel_list">
            { connectionList.length > 0
            && <li key={"header"} style={{display:"flex", alignItems:'center', padding:'5px'}}>
                    <Divider>
                        <Chip icon={<ChatIcon />} label="DM" />
                    </Divider>
                </li>
            }
            {
                connectionList &&
                connectionList.map((user, i) => (
                    <li key={i}>
                        <ChannelLinkCard
                            to={`/chat/${user.username}`}
                            channel={user.display_name}
                            lastMessage={user.lastMessage ? (
                                ((auth.isLoading || (typeof auth.user != 'boolean' && user.lastMessage.user !== auth.user.display_name)) ? user.lastMessage.user : "You")
                                + " : " + user.lastMessage.message
                            ) : "No message so far"}
                            lastMessageTime={user.lastMessage ? formatDate(user.lastMessage.timestamp) : formatDate(new Date().toString())}
                            membersCount={0}
                        />
                    </li>
                ))
            }
        </ul>

    );
}

