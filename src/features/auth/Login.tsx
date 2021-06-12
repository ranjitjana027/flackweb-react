import * as React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { signin } from './authSlice';
import { Input, Button, Checkbox } from '../../utils/FormElements';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from '../../stylesheets/auth/login.module.scss';


export default function Login(){
	const [user,setUser]=React.useState<{username:string, password:string}>({
		username:'',
		password:''
	});
	const [remember,setRemember]=React.useState<boolean>(false);

	React.useEffect(() => {
		if(localStorage.getItem('flackwebRememberUsername')==='true'){
			setRemember(true);
			setUser(user=>{
				return {
				...user,
				username:localStorage.getItem('flackwebUsername')==null?'':`${localStorage.getItem("flackwebUsername")}`
				}
			});
		}
	},[]);

	const dispatch=useAppDispatch();

	const location: { state: { from: { pathname : string }}}=useLocation();

	const { from }= location.state || { from : { pathname :'/'}};
	const auth=useAppSelector ((state)=>state.auth);
	
	const handleSubmit=(e:React.SyntheticEvent)=>{
		e.preventDefault();
		dispatch(signin({...user,remember:remember}));
	}

	const handleChange=({target}:React.ChangeEvent<HTMLInputElement>)=>{
	const name=target.name;
	const val=target.value;
	setUser(user=>{
		return {
		...user,
		[name]:val
		};
	});
	};

	const handleCheckboxChange=({target}:React.ChangeEvent<HTMLInputElement>)=>{
		
		setRemember(target.checked);
	}

	if(auth.user){
		return <Redirect to={from} />
	}

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.app}>
					FLACK
				</div>
				<div className={styles.text}>
					Welcome Back
				</div>
				<form
				className={styles.form}
				onSubmit={handleSubmit} >
					<Input
					id="inputUsername"
					value={user.username}
					label="Email"
					icon={AlternateEmailIcon}
					options={{
						type:'email',
						name:'username',
						placeholder: 'Email',
						required: true,
						onChange: handleChange,
					}} />

					<Input
					id="inputPassWord"
					value={user.password}
					label="Password"
					icon={LockIcon}
					options={{
						type:'password',
						name:'password',
						placeholder: 'Password',
						required: true,
						onChange: handleChange,
					}} />

					<Checkbox 
					id="rememberMe"
					name="rememberMe"
					label="Remember Me"
					options={{
						onChange:handleCheckboxChange,
						checked:remember
					}} />

					<Button
					disabled={auth.isLoading}
					data-loading={ auth.isLoading }
					text="Sign In"
					type="submit" />

					<div className={styles.section}>
						<div className={styles.error}>
							{ !auth.isLoading && auth.status && auth.status }
						</div>
						<div className={styles.info}>
						By continuing, you are agree to our Conditions of Use and Privacy Notice.
						</div>
						<div className={styles.info}>
							Aren&apos;t Registered! <a href='/signup'> Register Now.</a>
						</div>
						<p style={{
							textAlign:'center'
						}}>
							&copy; 2019-2021
						</p>
					</div>

				</form>
			</div>

		</div>
	);

}
