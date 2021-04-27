import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSocket } from '../../hooks/use-socket';
import { addSearchResult, selectAllSearchKeys } from '../../features/groupSearch/groupSearchSlice';



export function GroupSearch(props){
    const [newGroup,setNewGroup]=useState({
        group_id:'',
        display_name:''
    });
    const [next,setNext]=useState(false);

    const toggleNext=e=>{
        setNext(next=>!next);
    }

    const socket=useSocket();

    const searchResults=useSelector(state=>state.groupSearch[newGroup['display_name'].toLowerCase()]);
    const allSearchKeys=useSelector(selectAllSearchKeys);

    const dispatch=useDispatch();

    const handleNewGroupInput=({target})=>{
        const name= target.name;
        const value=target.value;
        setNewGroup(prev=>{
        return {
            ...prev,
            [name]:value
        }
        });

        if(name==='display_name' && value!=='' && !allSearchKeys.includes(value.toLowerCase()) ){
            let fd=new FormData();
            fd.append('title',value.toLowerCase());
            fetch('/api/channels/match_title',{
                method:"POST",
                body:fd
            })
            .then(data=>data.json())
            .then(data=>{ 
                if(data.success){
                    dispatch(addSearchResult(data))
                }
            })
        }
    }

    const createNewGroup=()=>{
        socket.emit('join',{
        room_id:newGroup.group_id,
        room: newGroup.display_name
        });
        //props.joinGroup(newGroup);
        setNewGroup({
        group_id:'',
        display_name:''
        });
        props.toggleSidebar();
    }

    const joinNewGroup=(title,id)=>{
        socket.emit('join',{
            room_id: id,
            room:title
        });
        props.toggleSidebar();
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    
    return (
        <div className={props.active?"new-group active":"new-group"}>
            <div className="headline">
                Create or Join a new group
            </div>
            <form
            className="new-group-form"
            onSubmit={handleSubmit} >
                <div className="form-section">
                    <input
                    readOnly={next}
                    placeholder="Group Display Name"
                    name="display_name"
                    value={newGroup.display_name}
                    onChange={handleNewGroupInput} />
                    <button onClick={toggleNext}>
                        { next? 'Back' :'Next'}
                    </button>
                </div>
                <div style={{
                    display: next?'':'none'
                }}
                className="form-section" >
                    <input
                    placeholder="Group ID"
                    value={newGroup.group_id}
                    name="group_id"
                    onChange={handleNewGroupInput} />
                    
                    <button onClick={createNewGroup}>Create</button>
                </div>
                <div>
                    
                </div>
            </form>
            <div className="search-result">
                {
                    searchResults && searchResults.length!==0 && <h3>Available channels</h3>
                }
                {
                    searchResults && 
                    searchResults.map((item,i)=>(
                    <div 
                    key={i} 
                    className="search-result-channel" >
                        <div className="channel-name">
                            <div className="channel-title">{item.channel_name}</div>
                            <div className="channel-id">{`@${item.channel_id}`}</div>
                        </div>
                        <div className="channel-members-count">{item.members_count} members</div>
                        <button onClick={()=>joinNewGroup(item.channel_name,item.channel_id)}>Join</button>
                    </div>))
                }
            </div>
        </div>
    );
        
        
        
}