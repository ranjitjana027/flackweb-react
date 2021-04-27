import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { Send } from '@material-ui/icons';
import { useSocket } from '../../hooks/use-socket';

function ChatBox(props){
    const inputMessage=useRef('');

    const handleChange=({ target })=>{

        inputMessage.current=target.value;
    }

    const socket=useSocket();
    const sendMessage=()=>{
        socket.emit(
            "send message",
            {
                message:inputMessage.current,
                room: props.room
            }
        );
        inputMessage.current="";
        document.querySelector('.multilineinput').innerText="";
    }

    return (
            <div className="chatinputbox">
                <ContentEditable
                className="multilineinput"
                onChange={handleChange}
                html={inputMessage.current} />

                <button
                type="submit"
                id="submit"
                onClick={sendMessage} >
                    <Send />
                </button>
            </div>
    );
}

export default ChatBox;