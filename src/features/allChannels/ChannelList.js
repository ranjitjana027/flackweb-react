import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../hooks/use-socket';
import { selectAllChannels, selectActiveChannels, loadChannels, removeChannel } from './allChannelsSlice';
import ChannelLinkCard from './ChannelListCard';
import '../../stylesheets/chat/channel_list.scss';

function ChannelList(){
    const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);

    useEffect(()=>{
        dispatch(loadChannels());
    },[dispatch]);

    const socket=useSocket();
    useEffect(()=>{
      socket.emit("join all");

      return ()=>{
        socket.emit("leave all")
      }
    }, [socket])

    useEffect(()=>{
        socket.on('join status', () => {
            dispatch(loadChannels());
        });

        return ()=>{
            socket.removeAllListeners('join status')
        }
    },[socket, dispatch])

    useEffect(()=>{
        socket.on('leave status',data=>{
            if(auth && auth.user.username===data.username){
                dispatch(removeChannel(data.room));
            }
        });

        return ()=>{
            socket.removeAllListeners('leave status');
        }
    },[socket, auth, dispatch]);



    let channels=useSelector(selectAllChannels);
    const activeChannels=useSelector(selectActiveChannels);
    if(activeChannels)
        channels=channels.filter(item=> activeChannels.includes(item.channel_id));



    const formatDate=str =>{
        const d=new Date(str);
        const diff=new Date()-d;
        if(diff<1000*3600*24){
          return d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit', 'hour12':true});
        }
        else if(diff<1000*3600*24*2){
          return 'Yesterday';
        }
        else {
          return d.toLocaleDateString([],{year: 'numeric', month: 'numeric', day: 'numeric'});
        }
    }

    if(!channels){
        return <div style={{ textAlign: 'center'}}>Loading</div>;
    }
    if(channels && channels.length===0){
      return <div style={{ textAlign: 'center'}}>Join A Channel First</div>
    }


    return (
        <ul className="channel_list">
            {
                channels &&
                channels.map((item,i)=>(
                    <li key={i}>
                        <ChannelLinkCard
                        to={`/chat/@${item.channel_id}`}
                        channel={item.channel_name}
                        lastMessage={item.last_message ? (
                        ( (auth.isLoading || (item.last_message.user!==auth.user.display_name) ) ?item.last_message.user:"You")
                        + " : "+item.last_message.message
                        ) : "No message so far" }
                        lastMessageTime={ item.last_message? formatDate(item.last_message.dttm):formatDate(item.created_on)}
                        membersCount={Number(item.members_count)}
                         />
                    </li>
                ))
            }
        </ul>

    );
}

export default ChannelList;
