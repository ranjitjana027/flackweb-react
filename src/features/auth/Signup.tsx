import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {Input, Button} from '../../utils/FormElements';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import styles from '../../stylesheets/auth/signup.module.scss';

export default function Signup() {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        re_password: '',
        name: ''
    });
    const [info, setInfo] = React.useState<string>('');

    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.password === user.re_password) {
            const headers= new Headers();
            headers.append("Content-Type", "application/json");
            fetch(`${process.env.REACT_APP_API_DOMAIN}/auth/signup`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        history.push("/login");
                    } else {
                        let info: string;
                        if (Array.isArray(data.message)){
                            info = data.message[0];
                        } else {
                            info = data.message || data.error || "Error while signing up."
                        }
                        setInfo(info);
                    }
                });
        } else {
            setInfo("Passwords do not match")
        }


    }

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const name = target.name;
        const val = target.value;
        setUser(user => {
            return {
                ...user,
                [name]: val
            };
        });
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.app}>
                    FLACK
                </div>
                <div className={styles.text}>
                    Create a new account
                </div>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}>

                    <Input
                        id="inputDisplayName"
                        value={user && user.name}
                        label="Name"
                        icon={PermIdentityIcon}
                        options={{
                            type: 'text',
                            name: 'name',
                            placeholder: 'Name',
                            required: true,
                            onChange: handleChange,
                        }}/>

                    <Input
                        id="inputUsername"
                        value={user && user.email}
                        label="Email"
                        icon={AlternateEmailIcon}
                        options={{
                            type: 'email',
                            name: 'email',
                            placeholder: 'Email',
                            required: true,
                            onChange: handleChange,
                        }}/>


                    <Input
                        id="inputPassword"
                        value={user && user.password}
                        label="Password"
                        icon={LockIcon}
                        options={{
                            type: 'password',
                            name: 'password',
                            placeholder: 'Password',
                            required: true,
                            onChange: handleChange,
                        }}/>

                    <Input
                        id="inputRePassword"
                        value={user && user.re_password}
                        label="Confirm Password"
                        icon={LockIcon}
                        options={{
                            type: 'password',
                            name: 're_password',
                            placeholder: 'Confirm Password',
                            required: true,
                            onChange: handleChange,
                        }}/>

                    <Button
                        text="Sign Up"
                        type="submit"/>

                    <div className={styles.section}>
                        <div className={styles.error}>
                            {info}
                        </div>
                        <div className={styles.info}>
                            By continuing, you are agree to our Conditions of Use and Privacy Notice.
                        </div>
                        <div className={styles.info}>
                            Already Registered! Log In <a href='/login'>here</a>.
                        </div>
                        <p style={{
                            textAlign: 'center'
                        }}>
                            &copy; 2019-2021
                        </p>
                    </div>

                </form>
            </div>

        </div>
    );

}
