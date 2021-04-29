import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';


const socketContext=createContext();

export function ProvideSocket(props){
  return (
    <socketContext.Provider value={useProvideSocket()} >
        {props.children}
    </socketContext.Provider>
  );
}

export function useSocket(){
  return useContext(socketContext);
}

function useProvideSocket(){
  const socket=io.connect('https://flackweb.netlify.app/');
  const emit=(event,cb) => {
    socket.emit(event,cb);
  }
  const on=(event,cb) => {
    socket.on(event,cb);
  }
  const removeAllListeners=event=>{
    socket.removeAllListeners(event);
  }

  return {
    socket,
    emit,
    on,
    removeAllListeners
  }
}
