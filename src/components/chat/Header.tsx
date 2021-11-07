import * as React from 'react';
import { ExitToApp } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../../stylesheets/chat/header.scss';
import CustomAvatar from "../../utils/CustomAvatar";
import {Tooltip} from "@mui/material";

type PropType={
    channel_info: boolean | {
        channel_id:string,
        channel_name:string,
        members_count:number
    },
    goBack: () => void,
    exitGroup: () => void,
    toggleChannelDetails: () => void
}

function Header(props: PropType){
    return (
        <div className = "header" >
            <div className = "channel-info">
                <div className = "arrow-back mobile-only" onClick = {props.goBack} >
                    <ArrowBackIcon />
                </div>
                <div className = "channel-dp" >
                    <CustomAvatar alt = {`${typeof props.channel_info !== 'boolean' && props.channel_info.channel_name}`} src = '' />
                </div>

                <Tooltip title = 'See Details' >
                    <div className = "channel-name" onClick = { props.toggleChannelDetails } >
                        <div className = "channel-title" > {typeof props.channel_info !== 'boolean' && props.channel_info.channel_name} </div>
                        <div className="channel-id" > {typeof props.channel_info !== 'boolean' && (`@${props.channel_info.channel_id}`)} </div>
                    </div>
                </Tooltip>
                {/* <div className="members-count"> {typeof props.channel_info !== 'boolean' && ( props.channel_info.members_count+' members')} </div> */}
            </div>
            <div className = "exit-group" onClick = {props.exitGroup} >
                <Tooltip title = 'Exit Group' >
                    <ExitToApp />
                </Tooltip>
            </div>
        </div>
    );
}

export default Header;
