import React,{ useEffect,useState } from 'react'

import {Link,useParams,useNavigate} from 'react-router-dom'
import axios from'axios'
function Update(){
    const [values,setValues]=useState({
            fname:"",
            lname:"",
            email:"",
            department:"",
        })
    //const [data,setData]=useState([])
    
    const params=useParams();
    const id=params.id
    const navigate= useNavigate();
    const handleUpdate=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:3000/user/'+id,values)
        .then(res=>{
            console.log(res)
            navigate("/");
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        axios.get(`http://localhost:3000/user/`+params.id)
        .then(res=>setValues(res.data))
        .catch(err=>console.log(err))
    },[params.id])
    
    return(
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                    <h1>Update user</h1>
                    <form onSubmit={handleUpdate}>
                        <div className='mb-2'>
                            <label htmlFor='name'>First Name:</label>
                            <input type='text' name="name" className='form-control' placeholder='Enter Name'
                             value={values.fname}  onChange={e=>setValues({...values,fname:e.target.value})} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='Lname'>Last Name:</label>
                            <input type='text' name="Lname" className='form-control' placeholder='Enter Name'
                             value={values.lname}  onChange={e=>setValues({...values,lname:e.target.value})} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='email'>Email:</label>
                            <input type='email' name="email" className='form-control' placeholder='Enter Email' 
                            value={values.email}  onChange={e=>setValues({...values,email:e.target.value})} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='department'>Department:</label>
                            <input type='text' name="department" className='form-control' placeholder='Enter Department Name' 
                            value={values.department}  onChange={e=>setValues({...values,department:e.target.value})} />
                        </div>
                        <button className='btn btn-success'>Update</button>
                        <Link to="/" className="btn btn-primary ms-3">Back</Link>
                    </form>
    
                </div>
    
            </div>
        )
}
export default Update