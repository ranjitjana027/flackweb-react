import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../stylesheets/chat/dashboard.scss';
import SideBar from './SideBar';
import ChannelList from '../../features/allChannels/ChannelList';
import ChatMessages from '../../features/chatMessages/ChatMessages';

export function Dashboard(){
    return (
        <div className="grid-container">
            <div className="chat-nav">
                <SideBar />
                <ChannelList />
            </div>
            <div className="chat-content">
                <Switch>
                    <Route path="/chat/:channel">
                      <ChatMessages />
                    </Route>
                    <Route path="/">
                        <div style={{
                            background: 'repeating-linear-gradient( black, transparent)',
                            height: '100%',
                            position: 'relative'
                        }} >
                            <div style={{
                                color: 'white',
                                margin: 'auto',
                                textAlign: 'center',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 'fit-content'
                            }}>
                                Select a chat to see messages
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}
