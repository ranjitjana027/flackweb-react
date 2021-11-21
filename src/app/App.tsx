import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import Dashboard from '../components/chat/Dashboard';
import LoginRequired from '../utils/LoginRequired';
import ProvideSocket from '../hooks/use-socket';

function App() {
    return (
        <Switch>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/signup">
                <Signup/>
            </Route>
            <LoginRequired>
                <Route path="/">
                    <ProvideSocket>
                        <Dashboard/>
                    </ProvideSocket>
                </Route>
            </LoginRequired>

        </Switch>
    );
}

export default App;
