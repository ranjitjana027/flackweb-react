import * as React from 'react';
import '../stylesheets/lib/form-label-animation.scss';

type InputPropType={
    id: string,
    label:string,
    value:string|null,
    options:{
        [key:string]:any
    }
}
export function Input(props:InputPropType){
    const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        let kc=e.keyCode;
        if((kc>47 && kc<58) || kc===32 || (kc>64 && kc<91) || (kc>95 && kc<112) || (kc>185 && kc<193) || (kc>218 && kc<223) || kc===229){
          (e.target as HTMLElement).classList.add('focus');
          const target=e.target as HTMLInputElement;
          if(target.labels!=null)
            target.labels[0].classList.add("input-focus");
        }
    }

    const handleKeyUp=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        const target=e.target as HTMLInputElement;
        if(target.value===""){
          target.classList.remove('focus');
          if(target.labels!=null)
            target.labels[0].classList.remove("input-focus");
        }
    }

    const handleInput=({target}: React.ChangeEvent<HTMLInputElement>)=>{
        if(target.value!==""){
          target.classList.add('focus');
          if(target.labels!=null)
            target.labels[0].classList.add("input-focus");
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

type ButtonPropType={
    text:string,
    type?:string,
    disabled?:boolean,
    options?:{[key:string]:any}
}
export function Button(props:ButtonPropType){
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