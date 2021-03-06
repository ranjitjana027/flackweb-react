import * as React from 'react';
import {Route, Redirect} from 'react-router';
import {Loader} from './Loader';
import {useAppSelector} from '../app/hooks';


function LoginRequired({children, ...rest}: { children: JSX.Element, [key: string]: unknown }): JSX.Element {
    const auth = useAppSelector(state => state.auth);
    if (auth.isLoading) {
        return <Loader/>;
    }
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth.user ? children : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}/>
                )
            }/>
    );
}

export default LoginRequired;
