import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { ThreeDotsLoader } from './Loader';
import styles from '../stylesheets/utils/form-elements.module.scss';


type InputPropType={
    id: string,
    label:string,
    value:string,
    icon?:OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    options:{
        [key:string]:any
    }
}
export function Input(props:InputPropType){
    const Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | undefined=props.icon;
    return (
        <div className={styles.container}>
            { Icon &&
                <div className={styles.icon}>
                    {Icon!=null && <Icon/>}
                </div>
            }
            <div className={styles.input}>
                <label
                className={props.value.length>0?styles.inputFocus:''}
                htmlFor={props.id } >
                    { props.label }
                </label>
                <input
                id={props.id}
                value={props.value}
                className={props.value.length>0?styles.focus:''}
                { ...props.options } />
            </div>
        </div>
    );
}

type ButtonPropType={
    text:string,
    type?:string,
    disabled?:boolean,
    'data-loading'?:boolean,
    options?:{[key:string]:any}
}

export function Button(props:ButtonPropType){
    return (
        <div className={styles.button}>
            {props['data-loading'] && <ThreeDotsLoader/>}
            <button
            { ...props.options }
            data-loading={props['data-loading']}
            disabled={props.disabled}>
                {props.text}
            </button>
        </div>
    );
}

type CheckboxPropType={
    id:string,
    name?:string,
    label?:string,
    options?:{[key:string]:any}
}

export function Checkbox(props:CheckboxPropType){
    return (
        <div className={styles.checkbox}>
            <input 
            type="checkbox"
            id={props.id}
            name={props.name}
            {...props.options } />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}