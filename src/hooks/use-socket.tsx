import * as React from 'react';
import io, {Socket} from 'socket.io-client';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

type SocketContextType = {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    emit: (event: string, payload?: unknown) => void,
    on: (event: string, cb: (data?: unknown) => void) => void,
    offAny: (event: (...args: unknown[]) => void) => void,
    removeAllListeners: () => void,
}

const socketContext = React.createContext<SocketContextType | null>(null);

export default function ProvideSocket(props:{children:any}){
    const socketValue = useProvideSocket();
    console.log("called here2")
  return (
    <socketContext.Provider value={socketValue} >
        {props.children}
    </socketContext.Provider>
  );
}

export function useSocket() {
    return React.useContext(socketContext);
}

function useProvideSocket() {
    console.log("called here")
    const socket: Socket = io(`${process.env.REACT_APP_API_DOMAIN}`, {
        transports: ['websocket'],
        extraHeaders: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('flackwebToken')}`
        },
        auth: {
            token: localStorage.getItem('flackwebToken')
        },
        forceNew: true
    });
    socket.on("connect", () => {
        console.log("connected!!", socket)
    })
    const emit = (event: string, payload?: any) => {
        socket.emit(event, {
            ...payload,
            // token: localStorage.getItem('flackwebToken')
        });
    }
    const on = (event: string, cb: () => void) => {
        socket.on(event, cb);
    }
    const offAny = (event: (...args: any[]) => void) => {
        socket.offAny(event);
    }

    const removeAllListeners = () => {
        socket.removeAllListeners();
    }



    return {
        socket,
        emit,
        on,
        offAny,
        removeAllListeners
    }
}
