import React from 'react';
import { useSelector } from 'react-redux';
import UserImage from '../../img/avatar.png';

export function Profile(props){
    const auth=useSelector(state=> state.auth);

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
                            <td>{auth.user && auth.user.display_name}</td>
                        </tr>
                        <tr>
                            <th>Username/Email</th>
                            <td>{auth.user && auth.user.username}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}
