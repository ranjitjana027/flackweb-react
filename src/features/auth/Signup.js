import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../../utils/FormElements';
import '../../stylesheets/auth/auth.scss';

export default function Signup(){
  const [user,setUser]=useState({
    username:'',
    password:'',
  	re_password:'',
  	display_name:''
  });
  const [info,setInfo]=useState('');

  const history=useHistory();

  const handleSubmit=(e)=>{
      e.preventDefault();
	  if(user.password===user.re_password){
		const fd=new FormData();
		fd.append("username",user.username);
		fd.append("password", user.password);
		fd.append("display_name", user.display_name);
		fetch('/api/signup',{
		  method:'POST',
		  body:fd
		})
		.then(response=>response.json())
		.then(data=>{
			if(data.success){
				history.push("/login");
			  }
			  else{
				setInfo("Error while signing up.");
			  }
		});
	  }
	  else{
		  setInfo("Passwords do not match")
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
	  	<div className="signup-page">
			<div>
				<div className="app-name">
					FLACK
				</div>
				<div className="welcome-text">
					Create a new account
				</div>
				<form
				className="signup-form"
				onSubmit={handleSubmit} >

					<Input
					id="inputDisplayName"
					value={user && user.display_name}
					label="Display Name"
					options={{
						type:'text',
						name:'display_name',
						placeholder: 'Display Name',
						required: true,
						onChange: handleChange,
					}} />

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
					id="inputPassword"
					value={user && user.password}
					label="Password"
					options={{
						type:'password',
						name:'password',
						placeholder: 'Password',
						required: true,
						onChange: handleChange,
					}} />

					<Input
					id="inputRePassword"
					value={user && user.re_password}
					label="Confirm Password"
					options={{
						type:'password',
						name:'re_password',
						placeholder: 'Confirm Password',
						required: true,
						onChange: handleChange,
					}} />

					<Button
					text="Sign Up"
					type="submit" />

					<div className="form-input">
						<div className='error-message'>
							{ info }
						</div>
						<div className="info-message">
						By continuing, you are agree to our Conditions of Use and Privacy Notice.
						</div>
						<div className="info-message">
							Already Registered! Log In <a href='/login'>here</a>.
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
