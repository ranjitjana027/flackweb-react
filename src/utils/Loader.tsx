import * as React from 'react';
import styles from '../stylesheets/utils/loader.module.scss';

export function Loader(): JSX.Element {
    return (
        <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export function ThreeDotsLoader(): JSX.Element {
    return (
        <div className={styles.threeDots}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
