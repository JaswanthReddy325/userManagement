import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
function Read(){
    const [data,setData]=useState([])
    
    const params=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3000/user/`+params.id)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[params.id])
    return(
        <div className='d-flex  justify-content-center align-items-center bg-light w-100 vh-100'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h3>Details of User</h3>
                <div className='mb-2'>
                    <strong>First Name: {data.fname}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Last Name: {data.lname}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Email: {data.email}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Department: {data.department}</strong>
                </div>
                <Link to={`/update/${params.id}`} className='btn btn-success'>Edit</Link>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>

            </div>
        </div>
    )
}
export default Read