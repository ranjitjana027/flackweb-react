import * as React from 'react';
import io, {Socket} from 'socket.io-client';
import {DefaultEventsMap} from 'socket.io-client/build/typed-events';

type SocketContextType = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    emit: (event: string, payload?: unknown) => void,
    on: (event: string, cb: (data?: unknown) => void) => void,
    offAny: (event: (...args: unknown[]) => void) => void
}

const socketContext = React.createContext<SocketContextType | null>(null);

export default function ProvideSocket(props:{children:any}){
  return (
    <socketContext.Provider value={useProvideSocket()} >
        {props.children}
    </socketContext.Provider>
  );
}

export function useSocket() {
    return React.useContext(socketContext);
}

function useProvideSocket() {
    const socket: Socket = io(`${process.env.REACT_APP_API_DOMAIN}`, {
        transports: ['websocket'],
        extraHeaders: {
            'Access-Control-Allow-Origin': '*',
        }
    });
    const emit = (event: string, payload?: any) => {
        socket.emit(event, {
            ...payload,
            token: localStorage.getItem('flackwebToken')
        });
    }
    const on = (event: string, cb: () => void) => {
        socket.on(event, cb);
    }
    const offAny = (event: (...args: any[]) => void) => {
        socket.offAny(event);
    }

    return {
        socket,
        emit,
        on,
        offAny
    }
}
