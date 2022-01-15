import * as React from 'react';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {Send} from '@material-ui/icons';
import {useSocket} from '../../hooks/use-socket';
import '../../stylesheets/chat/chatbox.scss';

function ChatBox(props: { room: string, isChannel: boolean }) {
    const {room, isChannel} = props;
    const text = React.useRef('');
    React.useEffect(() => {
        text.current = '';
    }, [room]);

    const handleBlur = () => {
        console.log(text.current);
    };

    const handleChange = (evt: ContentEditableEvent) => {
        text.current = evt.currentTarget.innerText;
    }

    const socket = useSocket();
    const sendMessage = () => {
        if (socket != null) {
            socket.emit(
                "send message",
                {
                    message: text.current,
                    room: room,
                    isChannel: isChannel
                }
            );
        }
        text.current = '';

    }

    return (
        <div className="chatinputbox">
            <ContentEditable
                className="multilineinput"
                onChange={handleChange}
                onBlur={handleBlur}
                html={text.current}/>

            <button
                type="submit"
                id="submit"
                title="Send Message"
                onClick={sendMessage}>
                <Send/>
            </button>
        </div>
    );
}

export default ChatBox;
