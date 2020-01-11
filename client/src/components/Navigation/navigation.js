import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <NavLink exact to="/" className="navbar-brand" href="#">Scrapi</NavLink>
                <ul className="nav mt-2 mt-lg-0 ">
                    <li className="nav-item active">
                        <NavLink activeClassName="active" to="/signin" className="nav-link" href="#">Sign In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/signup" className="nav-link" href="#">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/checkout" className="nav-link" href="#">Check Out</NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
