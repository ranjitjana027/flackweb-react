import { Route, Redirect } from 'react-router';
import { Loader}  from './Loader';
import { useAppSelector } from '../app/hooks';


function LoginRequired({children, ...rest}:{children:any,[key:string]:any}){
    const auth=useAppSelector (state=>state.auth);
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
