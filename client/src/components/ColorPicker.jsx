import React from 'react'
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    // <div className='absolute left-full ml-3 bottom-full'>
    //   {/* <SketchPicker
    //     color={snap.color}
    //     disableAlpha
    //     presetColors={[
    //       '#000000',
    //       '#FFFFFF',
    //       '#FF0000',
    //       '#00FF00',
    //       '#0000FF',
    //       '#FFFF00',
    //       '#00FFFF',
    //     ]}
    //     onChangeComplete={(color) => {state.tcolor = color.hex; sessionStorage.setItem('tcolor', color.hex)}}
    //   /> */}
    //   <select
    //     onChange={(e) => {
    //     state.tcolor = e.target.value
    //     sessionStorage.setItem('tcolor', e.target.value)
    //     }}
    //   >
    //     <option value="">Color</option>
    //     <option className="w-4 h-4 bg-black mr-2 text-white" value="#000000">Black</option>
    //     <option value="#FFFFFF">White</option>
    //     <option className="w-4 h-4 bg-red-500 mr-2 text-white" value="#FF0000">Red</option>
    //     <option className="w-4 h-4 bg-green-500 mr-2 text-white" value="#00FF00">Green</option>
    //     <option className="w-4 h-4 bg-blue-500 mr-2 text-white" value="#0000FF">Blue</option>
    //     <option className="w-4 h-4 bg-yellow-500 mr-2 text-white" value="#FFFF00">Yellow</option>
    //   </select>
    // </div>
    <div className='aipicker-container'>

      <div className='flex flex-wrap gap-3'>
        
          <div className='flex'>
            <select
               onChange={(e) => {
                state.tcolor = e.target.value
                sessionStorage.setItem('tcolor', e.target.value)
              }}
            >
              <option value="">Color</option>
              <option className="w-4 h-4 bg-black mr-2 text-white" value="#000000">Black</option>
              <option value="#FFFFFF">White</option>
              <option className="w-4 h-4 bg-red-500 mr-2 text-white" value="#FF0000">Red</option>
              <option className="w-4 h-4 bg-green-500 mr-2 text-white" value="#008000">Green</option>
              <option className="w-4 h-4 bg-blue-500 mr-2 text-white" value="#0000FF">Blue</option>
              <option className="w-4 h-4 bg-yellow-500 mr-2 text-white" value="#FFFF00">Yellow</option>
            </select>
            <select
              name="style"
              className=""
              onChange={(e) => {
                state.tstyle = e.target.value
                sessionStorage.setItem('tstyle', state.tstyle)
              }}
            >
              <option value={state.tstyle}>Style</option>
              <option value="standard">Standard</option>
              <option value="collar">Collar</option>
            </select>
          </div>
      </div>
    </div>
  )
}

export default ColorPicker