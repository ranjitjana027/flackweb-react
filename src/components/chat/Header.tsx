import * as React from 'react';
import { ExitToApp } from '@material-ui/icons';
import '../../stylesheets/chat/header.scss';

function Header(props: any){
    return (
        <div className="header">
            <div className="channel-info">
                <div className="channel-name">
                    <div className="channel-title">{props.channel_info && props.channel_info.channel_name}</div>
                    <div className="channel-id">{props.channel_info && ('@'+ props.channel_info.channel_id)}</div>
                </div>
                <div className="members-count">{props.channel_info && ( props.channel_info.members_count+' members')}</div>
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
