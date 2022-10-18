import { fireEvent } from '@testing-library/react';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Login.css'

const Login = () => {

    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = (event)=>{
        event.preventDefault()
        const form = event.target 
        const email = form.email.value
        const password = form.password.value
        signIn(email,password)
        .then(res =>{
            const user = res.user
            console.log(user);
            form.reset()
            navigate(from , {replace:true})
        })
        .catch(err => alert(err))

    }
    return (
        <div className='form-container'>
           <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="form-control">
             <label htmlFor="email">Email</label>
             <input type="email" name="email" id="email" placeholder='Email' required />
         </div>
         <div className="form-control">
             <label htmlFor="password">Password</label>
             <input type="password" name="password" id="password" placeholder='Password' required />
         </div>
            <input className='submit-btn' type="submit" value="Sign In" />
           </form>
           <p>Don't have an account? <Link to='/signup'>Create an accout</Link></p>
        </div>
    );
};

export default Login;