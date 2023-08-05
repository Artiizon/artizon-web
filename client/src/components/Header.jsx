import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useSnapshot } from 'valtio';

import state from '../store';

const Header = () => {

  const snap = useSnapshot(state);

  const navigate = useNavigate();

  const [customerAuth, setCustomerAuth] = useState(false);
  const [email, setEmail] = useState('');

  axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8080/').then(res => {
            if(res.data.Status === 'Success_Authentication') {
                setCustomerAuth(true);
                setEmail(res.data.email);
            } else {
                setCustomerAuth(false);
            }
        })
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8080/logout').then(res => {
            location.reload(true);
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <header>
        <button onClick={() => {
          state.page = 'home'
          navigate('/')
        }}
        >
        <p data-text="arTizon" className="example-one">
            ar<span>T</span>izon
        </p>
        </button>
        <p className='header-item'>
            <NavLink to="/customizor">CUSTOMIZOR</NavLink>
        </p>
        <p className='header-item'>
            <NavLink to="/designs">DESIGNS</NavLink>
        </p>
        <p className='header-item'>
            <NavLink to="/help">HELP</NavLink>
        </p>
        <p className='header-item'>
            <NavLink to="/about">ABOUT</NavLink>
        </p>
        {customerAuth && (
            <p className='header-item'>
                <NavLink to="/profile">{email}</NavLink>
            </p>
        )}
        {customerAuth && (
            <p className='header-item' onClick={handleLogout}>
                LOGOUT
            </p>
        )}
        {!customerAuth && (
            <p className='header-item'>
                <NavLink to="/login">LOGIN</NavLink>
            </p>
        )}
        
        {/* <div>
            <span></span>
            <span></span>
            <div className="inner-circle"></div>
        </div> */}
    </header>
  )
}

export default Header