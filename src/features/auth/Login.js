import React, {useState} from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from './authSlice';
import { Input, Button } from '../../utils/FormElements';
import '../../stylesheets/auth/auth.scss';

export default function Login(){
	const [user,setUser]=useState({
	username:'',
	password:''
	});


	const dispatch=useDispatch();

	const location=useLocation();

	const { from }= location.state || { from : { pathname :'/'}};
	const auth=useSelector(state=>state.auth);
	
	const handleSubmit=(e)=>{
		e.preventDefault();
		dispatch(signin(user));
	}

	const handleChange=({target})=>{
	const name=target.name;
	const val=target.value;
	setUser(user=>{
		return {
		...user,
		[name]:val
		};
	});
	};

	if(auth.user){
		return <Redirect to={from} />
	}

	return (
		<div className="login-page">
			<div>
				<div className="app-name">
					FLACK
				</div>
				<div className="welcome-text">
					Welcome Back
				</div>
				<form
				className="login-form"
				onSubmit={handleSubmit} >
					<Input
					id="inputUsername"
					value={user && user.username}
					label="Email"
					options={{
						type:'email',
						name:'username',
						placeholder: 'Email',
						required: true,
						onChange: handleChange,
					}} />

					<Input
					id="inputPassWord"
					value={user && user.password}
					label="Password"
					options={{
						type:'password',
						name:'password',
						placeholder: 'Password',
						required: true,
						onChange: handleChange,
					}} />

					<Button
					disabled={auth.isLoading}
					options={{
						'data-loading': auth.isLoading
					}}
					text="Sign In"
					type="submit" />

					<div className="form-input">
						<div className='error-message'>
							{ !auth.isLoading && auth.status && auth.status }
						</div>
						<div className="info-message">
						By continuing, you are agree to our Conditions of Use and Privacy Notice.
						</div>
						<div className="info-message">
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
