import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { useSocket } from '../../hooks/use-socket';
import { addSearchResult, selectAllSearchKeys } from './groupSearchSlice';

type PropType={
    active: boolean,
    toggleSidebar: ()=>void
}

export function GroupSearch(props:PropType){
    const [newGroup,setNewGroup]=React.useState<{group_id:string, display_name:string}>({
        group_id:'',
        display_name:''
    });
    const [next,setNext]=React.useState<boolean>(false);

    const toggleNext=()=>{
        setNext(next=>!next);
    }

    const socket=useSocket();

    const searchResults=useAppSelector(state=>state.groupSearch[newGroup['display_name'].toLowerCase()]);
    const allSearchKeys=useAppSelector(selectAllSearchKeys);

    const dispatch=useAppDispatch() ;

    const handleNewGroupInput=({target}:React.ChangeEvent<HTMLInputElement>)=>{
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
            fetch(`${process.env.REACT_APP_API_DOMAIN}/api/channels/match_title`,{
                method:"POST",
                headers:{
                  'Access-Control-Allow-Origin':'*',
                  'x-access-tokens': `${localStorage.getItem('flackwebToken')}`
                },
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
        if(socket!=null){
            socket.emit('join',{
            room_id:newGroup.group_id,
            room: newGroup.display_name
            });
        }

        setNewGroup({
        group_id:'',
        display_name:''
        });
        props.toggleSidebar();
    }

    const joinNewGroup=(title:string,id:string)=>{
        if(socket!=null){
            socket.emit('join',{
                room_id: id,
                room:title
            });
        }
        props.toggleSidebar();
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    }


    return (
      <div className="sidebar-content">
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
                    searchResults.map((item:{channel_id:string, channel_name:string, members_count:number},i:number)=>(
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
      </div>
    );



}
