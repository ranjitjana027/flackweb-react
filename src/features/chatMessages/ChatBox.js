import React, {  useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { Send } from '@material-ui/icons';
import { useSocket } from '../../hooks/use-socket';
import '../../stylesheets/chat/chatbox.scss';

function ChatBox(props){
    const text=useRef('');

    const handleBlur = () => {
      console.log(text);
    };

    const handleChange=(evt)=>{
        text.current=evt.currentTarget.innerText;
    }

    const socket=useSocket();
    const sendMessage=()=>{
        socket.emit(
            "send message",
            {
                message:text.current,
                room: props.room,
                token: localStorage.getItem('flackwebToken')
            }
        );
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
                onClick={sendMessage} >
                    <Send />
                </button>
            </div>
    );
}

export default ChatBox;
