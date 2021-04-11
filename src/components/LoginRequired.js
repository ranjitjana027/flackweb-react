import React from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from '../hooks/use-auth';

export const  LoginRequired= ({children, ...rest})=>{
    const auth=useAuth();
    return (
        <Route
        {...rest}
        render={({location}) =>
        auth.user?children:(
            <Redirect 
            to={{
                pathname:"/login",
                state:{ from: location}
            }} />
            ) 
        } />
    );
}