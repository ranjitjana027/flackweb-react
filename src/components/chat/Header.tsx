import * as React from 'react';
import { ExitToApp } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../../stylesheets/chat/header.scss';

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
        <div className = "header" onClick = { props.toggleChannelDetails }>
            <div className="channel-info">
                <div className="arrow-back mobile-only" onClick={props.goBack}>
                    <ArrowBackIcon />
                </div>
                <div className="channel-name">
                    <div className="channel-title">{typeof props.channel_info!='boolean' && props.channel_info.channel_name}</div>
                    <div className="channel-id">{typeof props.channel_info != 'boolean' && ( props.channel_info.members_count+' members')}</div>
                </div>
                {/* <div className="members-count">{typeof props.channel_info != 'boolean' && ( props.channel_info.members_count+' members')}</div> */}
            </div>
            <div
            className="exit-group"
            onClick={props.exitGroup}>
                <ExitToApp />
            </div>
        </div>
    );
}

export default Header;
