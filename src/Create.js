import React from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
function Create(){
    const [values,setValues]=useState({
        fname:"",
        lname:"",
        email:"",
        department:"",
    })
    const navigate= useNavigate();
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/user',values)
        .then(res=>{
            console.log(res);
            navigate("/");
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Add user</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='name'>First Name:</label>
                        <input type='text' name="name" className='form-control' placeholder='Enter First Name'
                         onChange={e=>setValues({...values,fname:e.target.value})} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='name'>Last Name:</label>
                        <input type='text' name="name" className='form-control' placeholder='Enter Last Name'
                         onChange={e=>setValues({...values,lname:e.target.value})} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name="email" className='form-control' placeholder='Enter Email' 
                        onChange={e=>setValues({...values,email:e.target.value})} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='phone'>Department:</label>
                        <input type='text' name="phone" className='form-control' placeholder='Enter Department Name' 
                        onChange={e=>setValues({...values,department:e.target.value})} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>

            </div>

        </div>
    )
}
export default Create