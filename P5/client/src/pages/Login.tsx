import React from 'react';
import { useRef } from 'react';
import * as qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

import './Login.scss'
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../states/AuthSlice';

interface LoginQuery{
    error : string
}

interface LoginPost{
    status: boolean,
    token: string
}

const Login: React.FC = () => {
    const location = useLocation()
    const history = useHistory()
    const formRef = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch()

    const loginAction = async () => {
        let form = formRef.current!

        if(form.checkValidity()){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username : (document.getElementById('username') as HTMLInputElement).value,
                    password : (document.getElementById('password') as HTMLInputElement).value
                })
            };
    
            var result = await fetch('http://localhost:3000/api/login', requestOptions)

            if(result.ok){
                let response : LoginPost = await result.json()
                localStorage.setItem('token',response.token)
                dispatch(setAuthenticated(true))
            }else{
                history.push('/login?error=Invalid credentials')
            }
        }else{
            form.reportValidity()
        }
    }

    let query = qs.parse(location.search) as any as LoginQuery

    let errorMsg = query.error ? 
        <p style={{color:'red'}}>{query.error}</p>
        :
        <></>

    return (
        <div className="loginContent">
            <div className="box">
                <h1> Login Page </h1>

                <div style={{ margin: 20 }}>
                    <form ref={formRef} style={{ maxWidth: 300, margin: 'auto' }}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                                required />
                        </div>

                        {errorMsg}

                        <br/>
                        <button type="button" className="btn btn-primary" onClick={loginAction}>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login
