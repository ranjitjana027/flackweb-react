import React, {useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { Input, Button } from '../FormElements';
import '../../stylesheets/auth/auth.scss';

export function Login(){
  const [user,setUser]=useState({
    username:'',
    password:''
  });
  const [info,setInfo]=useState("");

  const auth=useAuth();
  
  const location=useLocation();
  const history=useHistory();

  const { from }= location.state || { from : { pathname :'/'}};

  const handleSubmit=(e)=>{
      e.preventDefault();
      if(auth.signin(user.username,user.password)){
          history.replace(from);
      }
	  else{
		  setInfo("No User Found with this Username/Password")
	  }

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
					text="Sign In"
					type="submit" />
					
					<div className="form-input">
						<div className='error-message'>
							{ info }
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
