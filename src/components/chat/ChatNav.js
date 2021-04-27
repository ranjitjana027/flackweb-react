import React, { Fragment} from 'react';
import ChannelList from '../../features/allChannels/ChannelList';
import '../../stylesheets/chat/chat_nav.scss';
import SideBar from './SideBar';

function ChatNav(){

    return (
        <Fragment>
            <SideBar />
            <ChannelList />
        </Fragment>
    );
}

export default ChatNav;