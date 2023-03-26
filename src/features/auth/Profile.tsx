import * as React from 'react';
import {useAppSelector} from '../../app/hooks';
import UserImage from '../../img/avatar.png';
import styles from '../../stylesheets/auth/profile.module.scss';


export default function Profile(): JSX.Element {
    const auth = useAppSelector((state) => state.auth);

    return (
        <div className={styles.profile}>
            <figure>
                <img
                    src={UserImage}
                    alt="profile-pic"/>
                <figcaption><b>{typeof auth.user != 'boolean' && auth.user.display_name}</b></figcaption>
                {/*<figcaption>{typeof auth.user != 'boolean' && auth.user.username}</figcaption>*/}
            </figure>
        </div>
    );
}
