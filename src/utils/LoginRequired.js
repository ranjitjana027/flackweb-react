import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Loader from './Loader';


const  LoginRequired= ({children, ...rest})=>{
    const auth=useSelector(state=>state.auth);
    if(auth.isLoading){
      return <Loader/>;
    }
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

export default LoginRequired;
