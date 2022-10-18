import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then(() => {})
            .catch(err => alert(err))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='header-menu'>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid && <span>{user.email}</span>
                }

                {
                    user?.uid ?
                        <button onClick={handleSignOut}>sign Out</button>
                        : <>
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                }

            </div>
        </nav>
    );
};

export default Header;