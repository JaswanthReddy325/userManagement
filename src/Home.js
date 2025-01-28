import React, { useEffect,useState} from 'react'
import axios from 'axios'
import {Link, useLocation} from 'react-router-dom'
function Home(){
    const [data,setData]=useState([])
    const location=useLocation()
    const handleDelete=(id)=>{
        const confirm=window.confirm("Would you like to delete?");
        if(confirm){
            axios.delete('http://localhost:3000/user/'+id)
            .then(res=>{
                location.reload();
            }).catch(err=>console.log(err))
        }
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/user')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
    return(
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
                            {
                                data.map((d,i)=>(
                                    <tr key={i}> 
                                       <td>{d.id}</td>
                                       <td>{d.fname}</td>
                                       <td>{d.lname}</td>
                                       <td>{d.email}</td>
                                       <td>{d.department}</td>
                                       <td>
                                       <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                                        <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                        <button onClick={e=>handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                                       </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    
                </table>

            </div>
        </div>
    )
    
}
export default Home