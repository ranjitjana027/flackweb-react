import * as React from 'react';
import {ExitToApp} from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../../stylesheets/chat/header.scss';
import CustomAvatar from "../../utils/CustomAvatar";
import {Tooltip} from "@mui/material";
import {useEffect} from "react";

type User = {
    username: string,
    display_name: string,
    dp?: string
}

type PropType = {
    channel_info: boolean | {
        channel_id: string,
        channel_name: string,
        members_count: number
    } | User,
    goBack: () => void,
    exitGroup: () => void,
    toggleChannelDetails: () => void
}

function Header(props: PropType) {
    let [id, setId] = React.useState('');
    let [name, setName] = React.useState('');
    const {channel_info, goBack, exitGroup, toggleChannelDetails} = props;
    useEffect(() => {
        if(typeof channel_info === 'object' && 'channel_id' in channel_info) {
            setId(channel_info.channel_id);
            setName(channel_info.channel_name);
        }
        if(typeof channel_info === 'object' && 'username' in channel_info) {
            setId(channel_info.username);
            setName(channel_info.display_name);
        }
    }, [channel_info]);

    return (
        <div className="header">
            <div className="channel-info">
                <div className="arrow-back mobile-only" onClick={goBack}>
                    <ArrowBackIcon/>
                </div>
                <div className="channel-dp">
                    <CustomAvatar alt={`${name}`}
                                  src=''/>
                </div>

                <Tooltip title='See Details'>
                    <div className="channel-name" onClick={toggleChannelDetails}>
                        <div
                            className="channel-title"> {name} </div>
                        <div
                            className="channel-id"> {id} </div>
                    </div>
                </Tooltip>
            </div>
            <div className="exit-group" onClick={exitGroup}>
                <Tooltip title='Exit Group'>
                    <ExitToApp/>
                </Tooltip>
            </div>
        </div>
    );
}

export default Header;
