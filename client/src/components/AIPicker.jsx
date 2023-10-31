import React from 'react'
import { useSnapshot } from 'valtio';

import CustomButton2 from './CustomButton2';

import state from '../store';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  const snap = useSnapshot(state);
  return (
    <div className='aipicker-container'>
      <textarea
        className='aipicker-textarea'
        placeholder='Add a text to the back of your T-shirt...'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton2
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton2
              type="outline"
              title="Add"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            {/* <CustomButton2
              type="filled"
              title="AI Texture"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            /> */}
            <select
               onChange={(e) => {
                state.textColor = e.target.value
                sessionStorage.setItem('textcolor', e.target.value)
              }}
            >
              <option value="">Color</option>
              <option value="#000000">Black</option>
              <option value="#FFFFFF">White</option>
              <option value="#FF0000">Red</option>
              <option value="#00FF00">Green</option>
              <option value="#0000FF">Blue</option>
              <option value="#FFFF00">Yellow</option>
            </select>
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker