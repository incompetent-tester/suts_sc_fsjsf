import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Menu from './components/Menu';
import About from './pages/About';
import Baskets from './pages/Baskets';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Products from './pages/Products';
import Users from './pages/Users';
import { setAuthenticated } from './states/AuthSlice';
import { RootState } from './states/Store';


const App: React.FC = () => {
    const authenticated = useSelector((state: RootState) => state.auth.authenticated)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAuthenticated(!!localStorage.getItem('token')))
    },[])

    const NonAuthRoute = () => <>
        <Route>
            <Login />
        </Route>
    </>

    const AuthRoute = () => <>
        <Route path="/products">
            <Products />
        </Route>

        <Route path="/users/:id?">
            <Users />
        </Route>

        <Route path="/baskets">
            <Baskets />
        </Route>

        <Route path="/about">
            <About />
        </Route>

        <Route path="/dashboard">
            <Dashboard />
        </Route>

        <Route path="/">
            <Redirect to="/dashboard" />
        </Route>
    </>

    return (
        <>
            <BrowserRouter>
                <Menu/>
                <Switch>
                {
                    authenticated ? 
                        <AuthRoute/>
                        :
                        <NonAuthRoute/>
                }
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
