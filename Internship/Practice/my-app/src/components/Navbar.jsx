import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/about">About</Link>
                <Link to="/signUp">SignUp</Link>
                <Link to="/home">Home</Link>
            </nav>
        </div>
    )
}

export default Navbar
