import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const DeletePopup = ({ onCancel, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-end">
          <button className="text-gray-600" onClick={onCancel}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">Are you sure you want to delete this design?</p>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg" onClick={onDelete}>
              Yes
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg" onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
