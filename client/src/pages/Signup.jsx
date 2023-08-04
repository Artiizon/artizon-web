import { useSnapshot } from "valtio";
import {  useState } from "react";
import axios from "axios";

import state from "../store";

import { useNavigate, NavLink } from "react-router-dom";

const Signup = () => {
    const snap = useSnapshot(state)

    state.page = 'no-canvas';

    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [title, setTitle] = useState('');
    const [phone, setPhone] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [address4, setAddress4] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [signupStatus, setSignupStatus] = useState('');
    
    // useEffect(() => {
    //     document.getElementById("main-btn").className = "get-started"
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/signup', {fname, lname, title, phone, address1, address2, address3, address4, email, password}).then((res) => {
            if(res.data.message) {
                alert(res.data.message);
            }
            else {
                state.page = 'home';
                navigate('/');
                alert('Signup successful');
            }
        })
    }

    return (
        <>
            <div className="signup-page">
                <div className="signup-left">
                    <img src="./canvas.png" alt="canvas" />
                </div>
                <div className="signup-right">
                    <form className="signup-form-container" onSubmit={handleSubmit}>
                        <h1>SIGNUP</h1>
                        <p>Please fill in your details</p>
                        <div className="signup-form-content">
                            <div className="signup-form-content-left">
                                <div>
                                    <label htmlFor="fname">First Name</label><br/>
                                    <input type="text" name="fname" id="fname" onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <span className="form-error">First name required</span>
                                <div>
                                    <label htmlFor="lname">Last Name</label><br/>
                                    <input type="text" name="lname" id="lname" onChange={(e) => setLname(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone</label><br/>
                                    <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label><br/>
                                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label><br/>
                                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="passwordConfirm">Confirm Password</label><br/>
                                    <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} />
                                </div>
                            </div>
                            <div className="signup-form-content-right">
                                <div>
                                    <label htmlFor="title">Title</label><br/>
                                    <select name="title" id="title" onChange={(e) => setTitle(e.target.value)}>
                                        <option value="">Select Title</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="address1">Address (line 1)</label><br/>
                                    <input type="text" name="address1" id="address1" onChange={(e) => setAddress1(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address2">Address (line 2)</label><br/>
                                    <input type="text" name="address2" id="address2" onChange={(e) => setAddress2(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address3">Address (line 3)</label><br/>
                                    <input type="text" name="address3" id="address3" onChange={(e) => setAddress3(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address4">Address (line 4)</label><br/>
                                    <input type="text" name="address4" id="address4" onChange={(e) => setAddress4(e.target.value)} />
                                </div>
                                <div>
                                    <button type="submit">Signup</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup