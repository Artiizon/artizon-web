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
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerTitle, setCustomerTitle] = useState('');
  const [customerName, setCustomerName] = useState('');

  axios.defaults.withCredentials = true;

    // Autherize Customer
    useEffect(() => {
        axios.get('http://localhost:8080/verifyCustomer').then(res => {
            if(res.data.Status === 'Success_Authentication') {
                setCustomerAuth(true);
                setCustomerEmail(res.data.email);
            } else {
                setCustomerAuth(false);
            }
        })
    }, [])

    // Get Customer details
        if (customerAuth) {
            axios.post('http://localhost:8080/getCustomer', {customerEmail}).then(res => {
                if(res.data.Status === 'Success') {
                    sessionStorage.setItem('customer_id', res.data.customer_id);
                    sessionStorage.setItem('customer_title', res.data.customer_title);
                    sessionStorage.setItem('customer_name', res.data.customer_name);

                    setCustomerTitle(res.data.customer_title);
                    setCustomerName(res.data.customer_name);
                }
            });
        } else {
            sessionStorage.removeItem('customer_id');
            sessionStorage.removeItem('customer_title');
            sessionStorage.removeItem('customer_name');
        }

    const handleLogout = () => {
        axios.get('http://localhost:8080/logout').then(res => {
            location.reload(true);
            alert("Log out successful");
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
            <NavLink to="/company-design">DESIGNS</NavLink>
        </p>
        <p className='header-item'>
            <NavLink to="/help">HELP</NavLink>
        </p>
        <p className='header-item'>
            <NavLink to="/about">ABOUT</NavLink>
        </p>
        {customerAuth && (
            <p className='header-item'>
                <NavLink to="/profile">{customerTitle} {customerName}</NavLink>
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