import React from 'react';

export function Feedback(props){
    return (
        <div className={props.active?"feedback active":"feedback"}>
            <div className="headline">
                Feedback
            </div>
            <form className="feedback-form">
                <div>
                    <input placeholder="Name"/>
                </div>
                <div>
                    <input placeholder="Email"/>
                </div>
                <div>
                    <textarea
                    rows="4"
                    placeholder="Message"/>
                </div>
                <button>Send</button>
            </form>
        </div>
    
    );
}