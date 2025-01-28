import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const initialData = [
  {
    "id": 1,
    "fname": "Leanne",
    "lname": "Graham",
    "email": "Sincere@april.biz",
    "department": "CSE"
  },
  {
    "id": 2,
    "fname": "Nagendra",
    "lname": "Gattam",
    "email": "nagendra@gmail.com",
    "department": "CIVIL"
  },
  {
    "id": 3,
    "fname": "Jaswanth",
    "lname": "Racha",
    "email": "jaswanth@gmail.com",
    "department": "CSE"
  },{
    "id": 4,
    "fname": "Eshwar",
    "lname": "Nelu",
    "email": "sai@gmail.com",
    "department": "CSE"
  },{
    "id": 5,
    "fname": "Shiva Raj",
    "lname": "Ullari",
    "email": "ullarishiva@gmail.com",
    "department": "ECE"
  },{
    "id": 6,
    "fname": "Bhavana",
    "lname": "Golusula",
    "email": "gbhavana@gmail.com",
    "department": "CSE"
  },{
    "id": 7,
    "fname": "Naresh",
    "lname": "Doddi",
    "email": "naresh@gmail.com",
    "department": "CSE"
  },{
    "id": 8,
    "fname": "Charan",
    "lname": "Ramaya",
    "email": "Ramaya@april.biz",
    "department": "ECE"
  },{
    "id": 9,
    "fname": "Madhan",
    "lname": "Grahamb",
    "email": "Grahamb@april.biz",
    "department": "CSE"
  },{
    "id": 10,
    "fname": "Ramya",
    "lname": "jog",
    "email": "Ramyajog@gmail.com",
    "department": "EEE"
  }

  
];

function Home() {
  const [data, setData] = useState(initialData); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user'); 
        setData(response.data); 

        // Store the fetched data in local storage
        localStorage.setItem('userData', JSON.stringify(response.data)); 
      } catch (error) {
        console.error('Error fetching data:', error);

        // Try to load data from local storage as a fallback
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          try {
            setData(JSON.parse(storedData));
          } catch (error) {
            console.error('Error parsing stored data:', error);
          }
        } else {
          // If both API call and local storage fail, use initial data
          setData(initialData); 
        }
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Would you like to delete?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/user/${id}`); 

        if (response.status === 200 || response.status === 204) {
          console.log('Data deleted successfully');
          const filteredData = data.filter((item) => item.id !== id);
          setData(filteredData);
          navigate('/')

          // Update local storage after successful deletion
          localStorage.setItem('userData', JSON.stringify(filteredData)); 
        } else {
          console.error('Error deleting data:', response.statusText);
          // Handle unsuccessful deletion (e.g., display an error message)
        }
      } catch (error) {
        console.error('Error deleting data:', error);
        // Handle network errors or other unexpected issues
      }
    }
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light w-100 vh-100 mt-2'>
      <h1 className='mt-2'>List of users</h1>

      <div className='w-90 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Add +</Link> 
        </div>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mail</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}> 
                <td>{d.id}</td>
                <td>{d.fname}</td>
                <td>{d.lname}</td>
                <td>{d.email}</td>
                <td>{d.department}</td>
                <td>
                  <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                  <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                  <button onClick={() => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
