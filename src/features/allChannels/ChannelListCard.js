import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

function ChannelLinkCard(props){
    let active =  useRouteMatch({ 
        path:props.to,
        exact: true 
    });

    return (
        <Link to={props.to} className={active?'active':''} >
            <div className="channel-icon">
                <GroupIcon/>
            </div>
            <div className="channel-details">
                <div className="channel-name">
                    {props.channel}
                </div>
                <div className="last-message">
                    { props.lastMessage }
                </div>
            </div>
            <div className="channel-stats">
                <div className="last-message-time">
                    { props.lastMessageTime }
                </div>
                <div className="new-message-count">
                    {props.membersCount}
                </div>
            </div>
        </Link>
    );
}

ChannelLinkCard.propTypes={
    to: PropTypes.string,
    channel: PropTypes.string,
    lastMessage: PropTypes.string,
    lastMessageTime: PropTypes.string,
    membersCount: PropTypes.number
}

//component
export default ChannelLinkCard;