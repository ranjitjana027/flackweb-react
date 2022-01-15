import * as React from 'react';
import {SvgIconTypeMap} from '@material-ui/core';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import {ThreeDotsLoader} from './Loader';
import styles from '../stylesheets/utils/form-elements.module.scss';


type InputPropType = {
    id: string,
    label: string,
    value: string,
    icon?: OverridableComponent<SvgIconTypeMap<unknown, "svg">>,
    options: {
        [key: string]: unknown
    }
}

export function Input(props: InputPropType): JSX.Element {
    const Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> | undefined = props.icon;
    return (
        <div className={styles.container}>
            {Icon &&
            <div className={styles.icon}>
                {Icon != null && <Icon/>}
            </div>
            }
            <div className={styles.input}>
                <label
                    className={props.value.length > 0 ? styles.inputFocus : ''}
                    htmlFor={props.id}>
                    {props.label}
                </label>
                <input
                    id={props.id}
                    value={props.value}
                    className={props.value.length > 0 ? styles.focus : ''}
                    {...props.options} />
            </div>
        </div>
    );
}

type ButtonPropType = {
    text: string,
    type?: string,
    disabled?: boolean,
    'data-loading'?: boolean,
    options?: { [key: string]: unknown }
}

export function Button(props: ButtonPropType): JSX.Element {
    return (
        <div className={styles.button}>
            {props['data-loading'] && <ThreeDotsLoader/>}
            <button
                {...props.options}
                data-loading={props['data-loading']}
                disabled={props.disabled}>
                {props.text}
            </button>
        </div>
    );
}

type CheckboxPropType = {
    id: string,
    name?: string,
    label?: string,
    options?: { [key: string]: unknown }
}

export function Checkbox(props: CheckboxPropType): JSX.Element {
    return (
        <div className={styles.checkbox}>
            <input
                type="checkbox"
                id={props.id}
                name={props.name}
                {...props.options} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}