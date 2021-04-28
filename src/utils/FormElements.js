import React from 'react';
import '../stylesheets/lib/form-label-animation.scss';

export function Input(props){
    const handleKeyDown=e=>{
        let kc=e.keyCode;
        if((kc>47 && kc<58) || kc===32 || (kc>64 && kc<91) || (kc>95 && kc<112) || (kc>185 && kc<193) || (kc>218 && kc<223) || kc===229){
          e.target.classList.add('focus');
          e.target.labels[0].classList.add("input-focus");
        }
    }

    const handleKeyUp=e=>{
        if(e.target.value===""){
          e.target.classList.remove('focus');
          e.target.labels[0].classList.remove("input-focus");
        }
    }

    const handleInput=e=>{
        if(e.target.value!==""){
          e.target.classList.add('focus');
          e.target.labels[0].classList.add("input-focus");
        }
    }

    return (
        <div className="form-input">
            <label
            htmlFor={props.id } >
                { props.label }
            </label>
            <input
            id={props.id}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onInput={handleInput}
            { ...props.options } />
        </div>
    );
}

export function Button(props){
    return (
        <div className="form-input">
            <button
            { ...props.options }
            disabled={props.disabled}
            className="form-button" >
                {props.text}
            </button>
        </div>
    );
}