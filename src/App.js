import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/auth/Login.js';
import { Signup } from './components/auth/Signup.js';
import { LoginRequired } from './components/LoginRequired.js';
import { ProvideAuth } from './hooks/use-auth.js';

function App() {
  return (
    <ProvideAuth>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <LoginRequired>
          <Route path="/">
            Dashboard
          </Route>
        </LoginRequired>
        
      </Switch>
    </ProvideAuth>
  );
}

export default App;
