import { Link, useRouteMatch } from 'react-router-dom';
import CustomAvatar from "../../utils/CustomAvatar";

type PropType={
    to:string,
    channel: string,
    lastMessageTime:string,
    lastMessage:string,
    membersCount:number
}

function ChannelLinkCard(props:PropType){
    let active =  useRouteMatch({ 
        path:props.to,
        exact: true,
        sensitive:true
    });

    return (
        <Link to={props.to} className={active?'active':''} >
            <div className="channel-icon">
                <CustomAvatar alt={`${props.channel}`} src={'profile.jpg'}/>
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

export default ChannelLinkCard;