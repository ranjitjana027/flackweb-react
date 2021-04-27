import React from 'react';
import UserImage from '../img/user.jpg';
export function Profile(props){
    return (
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
                            <td>User Name</td>
                        </tr>
                        <tr>
                            <th>Username/Email</th>
                            <td>user@example.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}