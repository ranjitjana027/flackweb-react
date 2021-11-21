import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSocket} from '../../hooks/use-socket';
import {selectAllChannels, selectActiveChannels, loadChannels, removeChannel} from './allChannelsSlice';
import {addNewMessages} from './../chatMessages/chatMessagesSlice';
import {updateLastMessage} from '../allChannels/allChannelsSlice';
import ChannelLinkCard from '../../components/chat/ChannelListCard';
import '../../stylesheets/chat/channel_list.scss';
import {useAppSelector} from '../../app/hooks';
import {ThreeDotsLoader} from '../../utils/Loader';
import GroupsIcon from '@material-ui/icons/Group';
import {Chip, Divider} from "@mui/material";

function ChannelList() {
    const dispatch = useDispatch();
    const auth = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(loadChannels());
    }, [dispatch]);

    const socket = useSocket();
    useEffect(() => {
        if (socket != null)
            socket.emit("join all");

        return () => {
            if (socket != null)
                socket.emit("leave all")
        }
    }, [socket])

    useEffect(() => {
        if (socket != null) {
            const joinListener = () => {
                dispatch(loadChannels());
            };
            socket.on('join status', joinListener);

            return () => {
                socket.offAny(joinListener);
            }
        }
    }, [socket, dispatch])

    useEffect(() => {
        if (socket != null) {
            const leaveListener = (data: any) => {
                if (typeof auth.user != 'boolean' && auth.user.username === data.username) {
                    dispatch(removeChannel(data.room));
                }
            }
            socket.on('leave status', leaveListener);

            return () => {
                socket.offAny(leaveListener);
            }
        }
    }, [socket, auth, dispatch]);

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

            socket.on('receive message', receiveMessageListener);
            return () => {
                socket.offAny(receiveMessageListener);
            }
        }
    }, [socket, dispatch]);


    let channels = useSelector(selectAllChannels);
    const activeChannels = useSelector(selectActiveChannels);
    if (typeof activeChannels != 'boolean' && typeof channels != 'boolean')
        channels = channels.filter(item => activeChannels.includes(item.channel_id));


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

    if (!channels) {
        // return <div style={{ textAlign: 'center'}}>Loading</div>;
        return (
            <div style={{position: 'relative'}}>
                <ThreeDotsLoader/>
            </div>
        )
    }
    if (channels && channels.length === 0) {
        return <div style={{textAlign: 'center'}}>Join A Channel First</div>
    }


    return (
        <ul className="channel_list">
            <li key={"header"} style={{display:"flex", alignItems:'center', padding:'5px'}}>
                <Divider>
                    <Chip icon={<GroupsIcon />} label="Channels" />
                </Divider>
            </li>
            {
                channels &&
                channels.map((item, i) => (
                    <li key={i}>
                        <ChannelLinkCard
                            to={`/chat/@${item.channel_id}`}
                            channel={item.channel_name}
                            lastMessage={item.last_message ? (
                                ((auth.isLoading || (typeof auth.user != 'boolean' && item.last_message.user !== auth.user.display_name)) ? item.last_message.user : "You")
                                + " : " + item.last_message.message
                            ) : "No message so far"}
                            lastMessageTime={item.last_message ? formatDate(item.last_message.dttm) : formatDate(item.created_on)}
                            membersCount={Number(item.members_count)}
                        />
                    </li>
                ))
            }
        </ul>

    );
}

export default ChannelList;
