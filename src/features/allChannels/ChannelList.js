import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../hooks/use-socket';
import { selectAllChannels, selectActiveChannels, loadChannels, removeChannel } from './allChannelsSlice';
import ChannelLinkCard from './ChannelListCard';

function ChannelList(){
    const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);

    useEffect(()=>{
        dispatch(loadChannels());
    },[]);

    const socket=useSocket();
    useEffect(()=>{
      socket.emit("join all");

      return ()=>{
        socket.emit("leave all")
      }
    }, [socket])
    socket.on('join status', () => {
        dispatch(loadChannels());
    });

    socket.on('leave status',data=>{
        if(auth && auth.user.username===data.username){
            dispatch(removeChannel(data.room));
        }
    })

    let channels=useSelector(selectAllChannels);
    const activeChannels=useSelector(selectActiveChannels);
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
// container
export default ChannelList;