import React, { useState } from 'react';
import { usePostUserMutation } from '../slice/userSlice';
import toast, { Toaster } from 'react-hot-toast';

function NewEmployee() {
  const [newUser] = usePostUserMutation();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    contact: '',
    address: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newUser(formData).unwrap();
      toast.success('Added successfully!');
      setFormData({
        first_name: '',
        middle_name: '',
        last_name: '',
        contact: '',
        address: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add employee. Please try again.');
    }
  };

  return (
    <main>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="new-user">
        <h2>Add Employee</h2>
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
        <button className='save-button' type="submit">Save</button>
      </form>
      </div>
    </main>
  );
}

export default NewEmployee;
