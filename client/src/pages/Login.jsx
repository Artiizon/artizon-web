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
    
    // useEffect(() => {
    //     document.getElementById("main-btn").className = "get-started"
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

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
                    <h1>Log In</h1>
                    <p>
                        New user? <NavLink className="signup-link" to="/signup">Signup</NavLink> now.
                    </p>
                    <div>
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login