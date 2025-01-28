import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Read() {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${params.id}`); // Replace with your actual API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);

        // Try to load data from local storage as a fallback
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            const foundUser = parsedData.find(user => user.id === parseInt(params.id));
            if (foundUser) {
              setData(foundUser); 
            } else {
              console.error('User not found in local storage');
            }
          } catch (error) {
            console.error('Error parsing stored data:', error);
          }
        } else {
          console.error('No user data available.');
        }
      }
    };

    fetchData();
  }, [params.id]); 

  return (
    <div className='d-flex justify-content-center align-items-center bg-light w-100 vh-100'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Details of User</h3>
        {data && ( 
          <>
            <div className='mb-2'>
              <strong>First Name:</strong> {data.fname}
            </div>
            <div className='mb-2'>
              <strong>Last Name:</strong> {data.lname}
            </div>
            <div className='mb-2'>
              <strong>Email:</strong> {data.email}
            </div>
            <div className='mb-2'>
              <strong>Department:</strong> {data.department}
            </div>
          </>
        )}
        <Link to={`/update/${params.id}`} className='btn btn-success'>Edit</Link>
        <Link to="/" className='btn btn-primary ms-3'>Back</Link>
      </div>
    </div>
  );
}

export default Read;
