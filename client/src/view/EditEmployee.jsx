import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserQuery, useUpdateUserMutation } from '../slice/userSlice';
import toast, { Toaster } from 'react-hot-toast';

function EditEmployee() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  
  const { data: user, isLoading, isError, error } = useGetUserQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    contact: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        middle_name: user.middle_name || '',
        last_name: user.last_name || '',
        contact: user.contact || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id, ...formData }).unwrap(); 
      toast.success('Updated successfully!');
      navigate('/list')
    } catch (err) {
      console.error(err);
      toast.error('Failed to update employee.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || error}</p>;
  if (!user) return <p>User not found</p>; 

  return (
    <main>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="edit-container">
        <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={formData.middle_name}
          onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
          placeholder="Middle Name"
        />
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          placeholder="Contact"
          required
        />
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Address"
          required
        />
        <button className='save-button' type="submit">Update</button>
      </form>
      </div>
      
    </main>
  );
}

export default EditEmployee;
