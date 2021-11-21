import * as React from 'react';

type Message = {
    dttm: string,
    message: string,
    mid: number,
    room: string,
    room_id: string,
    user: string
}

type PropType = {
    className?: string,
    messages: Message[],
    auth: {
        user: boolean | {
            username: string,
            display_name: string
        },
        status: boolean | string,
        isLoading: boolean,
        hasError: boolean
    }
}

function MessageList(props: PropType) {
    const divRef = React.useRef<HTMLDivElement | null>(null);
    let defaultDate = new Date(0);

    React.useEffect(() => {
        if (divRef.current != null) {
            divRef.current.scrollIntoView(
                {
                    behavior: 'auto'
                }
            );
        }

    });

    if (!props.messages) {
        return (
            <div
                className={props.className}>
                <div className="interstitial-message">
                    <p
                        style={{
                            margin: '0'
                        }}>
                        Loading...
                    </p>
                </div>

            </div>
        );
    } else if (props.messages.length === 0) {
        return (
            <div
                className={props.className}>
                <div className="interstitial-message">
                    <p
                        style={{
                            margin: '0'
                        }}>
                        No message so far
                    </p>
                </div>

            </div>
        );
    } else {
        return (
            <div className={props.className}>
                {
                    props.messages.map((message, i) => {
                        const messageTime = new Date(message.dttm);

                        const messageCard = (<React.Fragment key={i}>
                            {messageTime.toDateString() !== defaultDate.toDateString() ? (
                                <div className="message-list-date">{messageTime.toDateString()}</div>) : ''}
                            <div
                                className={typeof props.auth.user != 'boolean' && props.auth.user.display_name === message.user ? "user-message" : "message"}>
                                <div className="chat-message">
                                    <div className="sender">
                                        {typeof props.auth.user != 'boolean' && props.auth.user.display_name === message.user ? 'You' : message.user}
                                    </div>
                                    <div>
                                    <span className="content">
                                        {message.message}
                                    </span>
                                        <span className="dummy"></span>
                                    </div>


                                    <small className="time text-muted">
                                        {messageTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            'hour12': true
                                        })}
                                    </small>
                                </div>
                            </div>
                        </React.Fragment>);
                        defaultDate = messageTime;
                        return messageCard;
                    })
                }

                <div
                    style={{width: 0}}
                    ref={divRef}/>
            </div>
        );
    }
}

export default MessageList;