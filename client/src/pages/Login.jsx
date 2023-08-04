import { useSnapshot } from "valtio";
import {  useState } from "react";
import axios from "axios";

import state from "../store";

import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
    const snap = useSnapshot(state)

    state.page = 'no-canvas';

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function validateEmail(email) {
        if(email === '') {
            setEmailError('Email required');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }

    function validatePassword(password) {
        if(password === '') {
            setPasswordError('Password required');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        validateEmail(email);
        validatePassword(password);

        axios.post('http://localhost:8080/login', {email, password}).then(res => {
            console.log(res);
            state.page = 'home';
            navigate('/');
        }).catch(err => {
            console.log(err);
        }
        )
    }

    return (
        <>
            <div className="login-page">
                <form className="login-form-container" onSubmit={handleSubmit}>
                    <h1>LOG IN</h1>
                    <p>
                        New user? <NavLink className="signup-link" to="/signup">Signup</NavLink> now.
                    </p>
                    <div>
                        <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <span className="login-form-error">{emailError}</span>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <span className="login-form-error">{passwordError}</span>
                    <div>
                        <button type="submit">Login</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login