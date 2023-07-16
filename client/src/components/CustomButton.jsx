import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';

const CustomButton = ({ title, handleClick }) => {
    const snap = useSnapshot(state)
    // const generateStyle = (type) => {
    //     if (type === "filled") {
    //         return {
    //             backgroundColor: snap.color,
    //             color: "#fff"
    //         }
    //     }
    // }

    return (
        <button className="get-started" onClick={handleClick} id='main-btn'>
            <span>{title}</span>
            <div className='inner-circle-main-button'>

            </div>
        </button>
    )
}

export default CustomButton