
import {useNavigate, useParams} from 'react-router-dom'
import type { User } from '../api/userApi';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
const EditUserPage = () => {
    const {id}= useParams<{id:string}>()
    const navigate =useNavigate();
    const queryClient= useQueryClient();
    const users=queryClient.getQueryData<User[]>(['users']) || [];
    const user = users.find((u)=>u.id === Number(id));

    const [name,setName]=useState(user?.name || "");
    const [email,setEmail]= useState(user?.email||"")

  const handleSave = () => {
  const updated = users.map((u) =>
    u.id === user?.id ? { ...u, name, email } : u
  );
  queryClient.setQueryData(['users'], updated);
  // queryClient.invalidateQueries({ queryKey: ['users'] });
  navigate('/');
};

  return (
  <div className="p-8 max-w-xl mx-auto">
    <h1 className="text-2xl font-bold text-black mb-4">Edit the User</h1>
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded"
      />
    </div>
    <div className="mt-6 flex gap-4">
      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      <button
        onClick={() => navigate('/')}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
);
}

export default EditUserPage
