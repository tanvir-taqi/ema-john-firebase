import React, {  useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState('')
    const {createUser} = useContext(AuthContext)

    const handleSubmit = (event)=>{
        event.preventDefault()
        const form = event.target 
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value
        if(password.length < 8){
            setError('Password Must Be At Least 8 Characters')
            form.reset()
            return
        }
        if(password !== confirm){
            setError("Password Didn't Match")
            form.reset()
            return
        }
        createUser(email,password)
        .then(res =>{
            const user = res.user
            console.log(user);
        })
        .catch(err => alert(err))

    }
    return (
        <div className='form-container'>
        <form onSubmit={handleSubmit}>
         <h1>Sign Up</h1>
         <div className="form-control">
             <label htmlFor="email">Email</label>
             <input type="email" name="email" id="email" placeholder='Email' required />
         </div>
         <div className="form-control">
             <label htmlFor="password">Password</label>
             <input type="password" name="password" id="password" placeholder='Password' required />
         </div>
         <div className="form-control">
             <label htmlFor="confirm">Confirm Password</label>
             <input type="password" name="confirm" id="confirm" placeholder='Confirm Password' required />
         </div>
         <input className='submit-btn' type="submit" value="Sign Up" />
        </form>
        <p>Already have an account? <Link to='/login'>Sign In</Link></p>
        <p className='error-text'>{error}</p>
     </div>
    );
};

export default SignUp;