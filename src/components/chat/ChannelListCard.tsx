import { Link, useRouteMatch } from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

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
        exact: true 
    });

    return (
        <Link to={props.to} className={active?'active':''} >
            <div className="channel-icon">
                <PeopleAltIcon/>
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