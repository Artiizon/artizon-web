import React from 'react'

import CustomButton2 from './CustomButton2';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
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
            <select>
              <option value="">Color</option>
              <option value="standard">Standard</option>
              <option value="collar">Collar</option>
            </select>
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker