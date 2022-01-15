import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name.replace(/[^A-Za-z]/g, '').split(' ').slice(0, 2).reduce((prev, current) => prev + current[0], '')  //`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function CustomAvatar(props: { alt?: string, src?: string }): JSX.Element {
    return <Avatar alt={props.alt} src={props.src} {...stringAvatar(props.alt || "A")} />;
}
