import React from 'react'

import CustomButton2 from './CustomButton2';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className='aipicker-container'>
      <textarea
        className='aipicker-textarea'
        placeholder='Ask from the AI to generate a logo or a texture for you...'
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
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <CustomButton2
              type="filled"
              title="AI Texture"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker