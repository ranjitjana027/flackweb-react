import * as React from 'react';
import { useAppSelector } from '../../app/hooks';
import UserImage from '../../img/avatar.png';

type profileProp={
    active: boolean,
}

export function Profile(props:profileProp): JSX.Element {
    const auth=useAppSelector((state)=> state.auth);

    return (
        <div className="sidebar-content">
          <div className={props.active?"profile active":"profile"}>
            <div className="headline">
                My Profile
            </div>
            <div className="profile-pic">
                <img
                src={UserImage}
                alt="profile-pic"/>
            </div>
            <div className="profile-details">
                <table>
                    <tbody>
                        <tr>
                            <th>Display Name</th>
                            <td>{typeof auth.user!='boolean' && auth.user.display_name}</td>
                        </tr>
                        <tr>
                            <th>Username/Email</th>
                            <td>{typeof auth.user!='boolean' && auth.user.username}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}
