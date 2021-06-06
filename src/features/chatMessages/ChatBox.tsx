import React, { useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { Send } from '@material-ui/icons';
import { useSocket } from '../../hooks/use-socket';
import '../../stylesheets/chat/chatbox.scss';

function ChatBox(props:{ room: string}){
    const text=useRef('');

    const handleBlur = () => {
      console.log(text.current);
    };

    const handleChange=(evt: ContentEditableEvent)=>{
        text.current=evt.currentTarget.innerText;
    }

    const socket=useSocket();
    const sendMessage=()=>{
        if(socket!=null){
            socket.emit(
                "send message",
                {
                    message:text.current,
                    room: props.room
                }
            );
        }
        text.current='';

    }

    return (
            <div className="chatinputbox">
                <ContentEditable
                className="multilineinput"
                onChange={handleChange}
                onBlur={handleBlur}
                html={text.current} />

                <button
                type="submit"
                id="submit"
                title="Send Message"
                onClick={sendMessage} >
                    <Send />
                </button>
            </div>
    );
}

export default ChatBox;
