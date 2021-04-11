import React, { 
    useState, 
    createContext,
    useContext 
} from 'react';

/**
 * Reference: https://usehooks.com/useAuth/
 */

const authContext=createContext();

export function ProvideAuth(props){
    return (
        <authContext.Provider value={useProvideAuth()}>
            {props.children}
        </authContext.Provider>
    );
}

export function useAuth(){
    return useContext(authContext);
}

function useProvideAuth(){
    const [user,setuser]=useState(null);

    const signin=(email,password)=>{
        // neccesary stuffs will be added
        const user= {
            email:email,
        };
        setuser(user);
        return user;
    }

    const signup=(email,password,display_name)=>{
        // neccesary stuffs will be added
        const user= {
            email:email,
        };
        setuser(user);
        return user;
    }

    const signout=()=>{
        // neccesary stuffs will be added
        setuser(false);
    }

    return {
        user,
        signin,
        signup,
        signout
    }


}