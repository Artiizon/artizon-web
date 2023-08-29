import React from 'react'

import CustomButton2 from './CustomButton2'

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload Logo
        </label>

        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file === '' ? 'No file selected' : file.name}
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton2
          type='outline'
          title='Left'
          handleClick={() => readFile('logo1')}
          customStyles='text-xs'
        />
        {/* <CustomButton2
          type='filled'
          title='Texture'
          handleClick={() => readFile('full')}
          customStyles='text-xs'
        /> */}
        <CustomButton2
          type='outline'
          title='Right'
          handleClick={() => readFile('logo2')}
          customStyles='text-xs'
        />
        <CustomButton2
          type='outline'
          title='Middle'
          handleClick={() => readFile('logo')}
          customStyles='text-xs'
        />
      </div>
    </div>
  )
}

export default FilePicker