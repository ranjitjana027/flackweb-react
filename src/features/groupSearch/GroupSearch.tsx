import { Add, ArrowBackIos, ArrowForwardIos, Block, Check, Warning} from '@material-ui/icons';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { useSocket } from '../../hooks/use-socket';
import { Input } from '../../utils/FormElements';
import { selectActiveChannels } from '../allChannels/allChannelsSlice';
import { addSearchResult, selectAllSearchKeys } from './groupSearchSlice';


export function GroupSearch(props:{toggleSidebar:()=>void}){
    const [newGroup,setNewGroup]=React.useState<{group_id:string, display_name:string}>({
        group_id:'',
        display_name:''
    });
    const [next,setNext]=React.useState<boolean>(false);
    const [available,setAvailable]=React.useState<boolean>(true);

    const toggleNext=()=>{
        setNext(next=>!next);
    }

    const socket=useSocket();

    const searchResults=useAppSelector(state=>state.groupSearch[newGroup['display_name'].toLowerCase()]);
    const allSearchKeys=useAppSelector(selectAllSearchKeys);
    const activeChannels=useAppSelector(selectActiveChannels);

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

        if(name==='display_name' && value.trim()!=='' && !allSearchKeys.includes(value.toLowerCase()) ){
            let fd=new FormData();
            fd.append('title',value.trim().toLowerCase());
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
        else if(name==='group_id' && value.trim()!==''){
            
            let fd=new FormData();
            fd.append('id',value.trim());
            fetch(`${process.env.REACT_APP_API_DOMAIN}/api/channels/match_id`,{
                method:"POST",
                headers:{
                  'Access-Control-Allow-Origin':'*',
                  'x-access-tokens': `${localStorage.getItem('flackwebToken')}`
                },
                body:fd
            })
            .then(data=>data.json())
            .then(data=>{
                setAvailable(!data.success);
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
        <div className="new-group">
            <form
            className="new-group-form"
            onSubmit={handleSubmit} >
                <div className="form-section">
                    <Input
                    id="display_name"
                    label="Group Name"
                    value={newGroup.display_name}
                    options={{
                        readOnly:next,
                        autoComplete:"off",
                        name:"display_name",
                        onChange:handleNewGroupInput
                    }}  />
                    { newGroup.display_name!=='' &&
                    <div 
                    className="button"
                    onClick={toggleNext} >
                        { next? <ArrowBackIos/>:<ArrowForwardIos/>}
                    </div>
                    }
                </div>
                <div style={{
                    display: next?'':'none'
                }}
                className="form-section" >
                    <Input
                    id="group_id"
                    label="Group ID"
                    value={newGroup.group_id}
                    options={{
                        name:"group_id",
                        autoComplete:"off",
                        onChange:handleNewGroupInput
                    }} />
                    { newGroup.group_id!==''  &&
                    <div 
                    className="button" 
                     >
                        { available?<Check onClick={createNewGroup}/>:<Warning/>}
                    </div>
                    }
                </div>
                <div>

                </div>
            </form>
            <div className="search-result">
                {
                    searchResults &&  searchResults.length!==0 && <h3>Available channels</h3>
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
                        <button 
                        disabled={typeof activeChannels!='boolean' && activeChannels.includes(item.channel_id)}
                        onClick={()=>joinNewGroup(item.channel_name,item.channel_id)} >
                            { !(typeof activeChannels!='boolean' && activeChannels.includes(item.channel_id))? <Add/>:<Block/>}
                        </button>
                    </div>))
                }
            </div>
        </div>
      
    );



}
