import * as React from 'react';

export function Feedback(props:{active:boolean}){
    return (
        <div className="sidebar-content">
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
                      rows={4}
                      placeholder="Message" />
                  </div>
                  <button>Send</button>
              </form>
          </div>
      </div>

    );
}
