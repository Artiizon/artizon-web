import React from 'react'
import { NavLink } from 'react-router-dom';

import { useSnapshot } from 'valtio';

import state from '../store';

import { useNavigate } from 'react-router-dom';

const Header = () => {

  const snap = useSnapshot(state);

  const navigate = useNavigate();

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
        <p className='header-login'>
            <NavLink to="/login">Login</NavLink>
        </p>
        {/* <div>
            <span></span>
            <span></span>
            <div className="inner-circle"></div>
        </div> */}
    </header>
  )
}

export default Header