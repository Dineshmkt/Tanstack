import React from 'react'

interface DeleteButtonProps{
    onDelete:()=>void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <button
      onClick={onDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteButton
