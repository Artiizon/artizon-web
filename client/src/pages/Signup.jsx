import { useSnapshot } from "valtio";
import {  useState } from "react";
import axios from "axios";

import state from "../store";
import Tlog from "../images/tlog2.png";
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
    const [userType, setUserType] = useState('customer');
    const [signupStatus, setSignupStatus] = useState('');

    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [address1Error, setAddress1Error] = useState('');
    const [address2Error, setAddress2Error] = useState('');
    const [address3Error, setAddress3Error] = useState('');
    const [address4Error, setAddress4Error] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    function validateFname(fname) {
        if(fname === '') {
            setFnameError('First name required');
            return false;
        } else {
            setFnameError('');
            return true;
        }
    }

    function validateLname(lname) {
        if(lname === '') {
            setLnameError('Last name required');
            return false;
        } else {
            setLnameError('');
            return true;
        }
    }

    function validateTitle(title) {
        if(title === '') {
            setTitleError('Title required');
            return false;
        } else {
            setTitleError('');
            return true;
        }
    }

    function validatePhone(phone) {
        if(phone === '') {
            setPhoneError('Phone required');
            return false;
        } else {
            setPhoneError('');
            return true;
        }
    }

    function validateAddress1(address1) {
        if(address1 === '') {
            setAddress1Error('Address line 1 required');
            return false;
        } else {
            setAddress1Error('');
            return true;
        }
    }
    
    function validateAddress2(address2) {
        if(address2 === '') {
            setAddress2Error('Address line 2 required');
            return false;
        } else {
            setAddress2Error('');
            return true;
        }
    }
    
    function validateAddress3(address3) {
        if(address3 === '') {
            setAddress3Error('Address line 3 required');
            return false;
        } else {
            setAddress3Error('');
            return true;
        }
    }

    function validateAddress4(address4) {
        if(address4 === '') {
            setAddress4Error('Address line 4 required');
            return false;
        } else {
            setAddress4Error('');
            return true;
        }
    }

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

    function validatePasswordConfirm(passwordConfirm) {
        if(passwordConfirm === '') {
            setPasswordConfirmError('Password confirmation required');
            return false;
        } else if (passwordConfirm !== password) {
            setPasswordConfirmError('Passwords do not match');
            return false;
        } else {
            setPasswordConfirmError('');
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidFname = validateFname(fname);
        const isValidLname = validateLname(lname);
        const isValidTitle = validateTitle(title);
        const isValidPhone = validatePhone(phone);
        const isValidAddress1 = validateAddress1(address1);
        const isValidAddress2 = validateAddress2(address2);
        const isValidAddress3 = validateAddress3(address3);
        const isValidAddress4 = validateAddress4(address4);
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const isValidPasswordConfirm = validatePasswordConfirm(passwordConfirm);

        if(isValidFname && isValidLname && isValidTitle && isValidPhone && isValidAddress1 && isValidAddress2 && isValidAddress3 && isValidAddress4 && isValidEmail && isValidPassword && isValidPasswordConfirm) {

            axios.post('http://localhost:8080/signup', {fname, lname, title, phone, address1, address2, address3, address4, email, password, userType}).then((res) => {
                if(res.data.Status === 'Success_Signup') {
                    navigate('/');
                    alert('Signup Successful');
                } else {
                    alert('Signup Failed');
                }
            })
        }
    }

    return (
        <>
            <div className="signup-page">
                <div className="signup-left">
                    <img src={Tlog} alt="canvas" />
                </div>
                <div className="signup-right">
                    <form className="signup-form-container" onSubmit={handleSubmit}>
                        <h1>SIGN UP</h1>
                        <p>Please fill in your details</p>
                        <div className="signup-form-content">
                            <div className="signup-form-content-left">
                                <div>
                                    <label htmlFor="fname">First Name</label><br/>
                                    <input type="text" name="fname" id="fname"  onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{fnameError}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="lname" >Last Name</label><br/>
                                    <input type="text" name="lname" id="lname" onChange={(e) => setLname(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{lnameError}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="phone">Phone</label><br/>
                                    <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{phoneError}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="email">Email</label><br/>
                                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{emailError}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="password">Password</label><br/>
                                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{passwordError}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="passwordConfirm">Confirm Password</label><br/>
                                    <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{passwordConfirmError}</span>
                            </div>
                            <div className="signup-form-content-right ">
                                <div>
                                    <label htmlFor="title">Title</label><br/>
                                    <select name="title"  id="title"  onChange={(e) => setTitle(e.target.value)}>
                                        <option value="" className="w-[300px]">Select Title</option>
                                        <option value="Mr" className="w-[300px]">Mr</option>
                                        <option value="Ms" className="w-[300px]">Ms</option>
                                    </select>
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{titleError}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="address1">Address (line 1)</label><br/>
                                    <input type="text" name="address1" id="address1" onChange={(e) => setAddress1(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{address1Error}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="address2">Address (line 2)</label><br/>
                                    <input type="text" name="address2" id="address2" onChange={(e) => setAddress2(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{address2Error}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="address3">Address (line 3)</label><br/>
                                    <input type="text" name="address3" id="address3" onChange={(e) => setAddress3(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{address3Error}</span>
                                <div className="mt-[17px]">
                                    <label htmlFor="address4">Address (line 4)</label><br/>
                                    <input type="text" name="address4" id="address4" onChange={(e) => setAddress4(e.target.value)} />
                                </div>
                                <span className="signup-form-error text-[12px] text-red-500">{address4Error}</span>
                                <div >
                                    <button type="submit">CREATE ACCOUNT</button>
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