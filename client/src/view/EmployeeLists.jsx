import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchUserQuery, useDestroyUserMutation } from '../slice/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

    function EmployeeLists() {

    const { data, isLoading, isError, error } = useFetchUserQuery();
    const users = data?.rows ?? [];
    const navigate = useNavigate();

    const [destroyUser] = useDestroyUserMutation();

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

    try {
      await destroyUser(id).unwrap();
      toast.success("Deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user.");
    }
  };

  const downloadExcel = () => {
    if (!users.length) return;

    const worksheet = XLSX.utils.json_to_sheet(users); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'employees.xlsx'); 
  };

  const downloadUserExcel = (user) => {
    const worksheet = XLSX.utils.json_to_sheet([user]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employee');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${user.first_name}_${user.last_name}.xlsx`); 
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || error}</p>;

  return (
    <main>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="list-container">
        <div className='dl-excel'><button className='exl-btn' onClick={downloadExcel}>Download All</button></div>
        <table>
          <thead>
            <tr className='head-table'>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Contact No.</th>
              <th>Address</th>
              <th>PDF</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className='body-table'>
                <td>{user.first_name}</td>
                <td>{user.middle_name}</td>
                <td>{user.last_name}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
                <td title='download'>
                  <svg 
                    className='pdf-icon' 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" height="32" 
                    viewBox="0 0 32 32"
                    onClick={() => downloadUserExcel(user)}
                    style={{ cursor: 'pointer' }}
                  >
                    <path fill="currentColor" d="M30 18v-2h-6v10h2v-4h3v-2h-3v-2zm-11 8h-4V16h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3m-2-2h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2zm-6-8H6v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2 2 0 0 0-2-2m-3 5v-3h3l.001 3z"/>
                    <path fill="currentColor" d="M22 14v-4a.91.91 0 0 0-.3-.7l-7-7A.9.9 0 0 0 14 2H4a2.006 2.006 0 0 0-2 2v24a2 2 0 0 0 2 2h16v-2H4V4h8v6a2.006 2.006 0 0 0 2 2h6v2Zm-8-4V4.4l5.6 5.6Z"/>
                  </svg>
                </td>
                <td className='icon-container'>
                  <button className='edit-icon' onClick={() => navigate(`/edit/${user.id}`)} title='edit'>
                    <svg className='action-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
                    </svg>
                  </button>

                  <button className='delete-icon' onClick={() => deleteUser(user.id)} title='delete'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default EmployeeLists;
