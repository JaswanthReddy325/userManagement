import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    email: '',
    department: '',
  });
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`); // Replace with your actual API endpoint
        setValues(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);

        // Check for user data in local storage as a fallback
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            const foundUser = parsedData.find(user => user.id === parseInt(id));
            if (foundUser) {
              setValues(foundUser);
            } else {
              console.error('User not found in local storage');
              // Optionally, display a message to the user indicating the user was not found
            }
          } catch (error) {
            console.error('Error parsing stored data:', error);
          }
        } else {
          console.error('No user data available.');
          // Optionally, display a message to the user indicating no data is available
        }
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/user/${id}`, values)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update user</h1>
        <form onSubmit={handleUpdate}>
          <div className='mb-2'>
            <label htmlFor='name'>First Name:</label>
            <input
              type='text'
              name="name"
              className='form-control'
              placeholder='Enter Name'
              value={values.fname}
              onChange={(e) => setValues({ ...values, fname: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='Lname'>Last Name:</label>
            <input
              type='text'
              name="Lname"
              className='form-control'
              placeholder='Enter Name'
              value={values.lname}
              onChange={(e) => setValues({ ...values, lname: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name="email"
              className='form-control'
              placeholder='Enter Email'
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='department'>Department:</label>
            <input
              type='text'
              name="department"
              className='form-control'
              placeholder='Enter Department Name'
              value={values.department}
              onChange={(e) => setValues({ ...values, department: e.target.value })}
            />
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
