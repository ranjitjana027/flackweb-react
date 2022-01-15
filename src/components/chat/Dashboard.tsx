import * as React from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';
import '../../stylesheets/chat/dashboard.scss';
import SideBar from './SideBar';
import ChannelList from '../../features/allChannels/ChannelList';
import ChatMessages from '../../features/chatMessages/ChatMessages';
import DirectMessageList from "../../features/directMessage/DirectMessageList";

export default function Dashboard() {
    const match = useRouteMatch({
        path: '/',
        exact: true
    });

    return (
        <div className="grid-container">
            <div className="chat-nav">
                <SideBar/>
                <div style={{"overflow": "auto"}}>
                    <ChannelList/>
                    <DirectMessageList/>
                </div>

            </div>
            <div className={(!match) ? "chat-content show-chat" : "chat-content"}>
                <Switch>
                    <Route path="/chat/:channel">
                        <ChatMessages/>
                    </Route>
                    <Route exact path="/">
                        <div>
                            <div className="initial">
                                Select a chat to see messages
                            </div>
                        </div>
                    </Route>
                    <Redirect to='/' />
                </Switch>
            </div>
        </div>
    );
}
