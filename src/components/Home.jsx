import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import welcome from '../assets/images/welcome.gif'

function Home() {
  const navigate = useNavigate()
  const data = JSON.parse(sessionStorage.getItem("user"))

  const handleLogout = () => {
    toast.warning('Logout successfull')
    setTimeout(() => {
      navigate('/')
    }, 2000);

  }
  return (
    <>
   
       <div className='container  bg-dark '>
       
            
        
  
  
          <div className='log d-flex flex-column  align-items-center' >
          <div className='d-flex align-items-center'>
            <h1 className=' text-light me-2 mb-0'>Welcome, {data.name.toUpperCase()}</h1>
          </div>
      
          <img style={{width:'60%'}} src={welcome} alt="" />

        </div>
        <div className='d-flex justify-content-center'>
           
           <button  onClick={handleLogout} className=' btn btn-light shadow ps-5 pe-5'>Logout</button> 
  </div>
        </div>
     
       
        <ToastContainer position="top-center" theme="colored" autoClose={3000} />
   
    </>
  )
}

export default Home