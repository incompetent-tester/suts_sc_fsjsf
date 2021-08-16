import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { setAuthenticated } from '../states/AuthSlice';
import { RootState } from '../states/Store';

import './Menu.scss'

const Menu : React.FC = () => {
    const location = useLocation();
    const authenticated = useSelector((state: RootState) => state.auth.authenticated)
    const dispatch = useDispatch()

    return <>
        {
            authenticated ?
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark menuContainer">
                    <a className="navbar-brand" href="#">Menu</a>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav menuLeft">
                            <li className={location.pathname === "/" ? "nav-item active" : "nav-item"}>
                                <NavLink to="/dashboard" className="nav-link">Home</NavLink>
                            </li>
                            <li className={location.pathname.startsWith("/users") ? "nav-item active" : "nav-item"}>
                                <NavLink to="/users" className="nav-link">Users</NavLink>
                            </li>
                            <li className={location.pathname.startsWith("/products") ? "nav-item active" : "nav-item"}>
                                <NavLink to="/products" className="nav-link">Products</NavLink>
                            </li>
                            <li className={location.pathname.startsWith("/about") ? "nav-item active" : "nav-item"}>
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                            <li className={location.pathname.startsWith("/baskets") ? "nav-item active" : "nav-item"}>
                                <NavLink to="/baskets" className="nav-link">Basket</NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto menuRight">
                            <li><a onClick={() => {
                                localStorage.clear()
                                dispatch(setAuthenticated(false))
                            }} className="nav-link">Logout</a></li>
                        </ul>
                    </div>
                </nav>
                :
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark menuContainer">
                    <a className="navbar-brand" href="#">Menu</a>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav menuLeft"></ul>

                        <ul className="navbar-nav mr-auto menuRight">
                            <li><span className="nav-link">Not Authenticated</span></li>
                        </ul>
                    </div>
                </nav>
        }
    </>
}

export default Menu