import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    email: '',
    department: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user', values); 
      console.log('User created successfully:', response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Error creating user:', error);

      // Store the user data in local storage if the API call fails
      localStorage.setItem('userData', JSON.stringify(values)); 
      alert('Failed to create user. Data stored locally for later submission.'); 
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Add user</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='name'>First Name:</label>
            <input
              type='text'
              name="name"
              className='form-control'
              placeholder='Enter First Name'
              value={values.fname}
              onChange={(e) => setValues({ ...values, fname: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='name'>Last Name:</label>
            <input
              type='text'
              name="name"
              className='form-control'
              placeholder='Enter Last Name'
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
            <label htmlFor='phone'>Department:</label>
            <input
              type='text'
              name="phone"
              className='form-control'
              placeholder='Enter Department Name'
              value={values.department}
              onChange={(e) => setValues({ ...values, department: e.target.value })}
            />
          </div>
          <button className='btn btn-success'>Submit</button>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
