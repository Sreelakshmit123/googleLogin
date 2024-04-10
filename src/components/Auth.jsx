import React, { useState ,useEffect} from 'react'
import { Form } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ insideRegister }) {
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "", password: "", email: ""
  })

  const handleLogin = (e) => {
    e.preventDefault()
    const { username, password } = userData
    if (username && password) {
      navigate('/home')
    }
    else {
      toast.warning("Please fill the form completely!!!")
    }
  }
  const handleRegister = (e) => {
    e.preventDefault()
    const { username, password, email } = userData
    if (username && password && email) {
      navigate('/')
      setUserData("")
    }
    else {
      toast.warning("Please fill the form completely!!!")
    }
  }

  useEffect(() => {
    if (loginStatus) {
      sessionStorage.setItem("user", JSON.stringify(loginStatus))
      toast.success("Login Successfull")
      setTimeout(() => {
        navigate('/home')
      }, 2000);
    }

  }, [loginStatus])
  return (
    <>
      <div className='bg-dark pt-3 pb-5 '>
        <div className="container  w-75">
          <div className="card shadow mt-5  ">
            <div className='row align-items-center'>
              <div className='col-lg-6  p-5 '>

                <img className='w-100' src="https://lh4.googleusercontent.com/proxy/pONrw1m5Xiw12P_9NYPAFwWJLzCwTMzVHSp74dz7LMmio2Q4rvaoZRz5T4HpfheGn8gVQEpIag" alt="" />
              </div>
             
              <div className='col-lg-6 '>
                <h1>Welcome <span style={{ color: '#3636a9' }}>Back</span></h1>
                <h2 style={{ color: '#3636a9' }} className="fw-bolder mt-2">{insideRegister ? "sign up" : "Sign in "}</h2>
                <Form className="w-100">
                  {insideRegister && (
                    <Form.Group className="mb-3 me-5" controlId="formBasicName">
                      <Form.Control type="text" placeholder="Enter Username" onChange={e => setUserData({ ...userData, username: e.target.value })} value={userData.username} />
                    </Form.Group>)}

                  <Form.Group className="mb-3 me-5" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
                  </Form.Group>

                  <Form.Group className="mb-3 me-5" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
                  </Form.Group>


                  {
                    insideRegister ?
                      <div>
                        <button  onClick={handleRegister} className='btn btn-dark mb-2 ps-5 pe-5 '>Sign Up</button>
                        <p className='text-center'>or</p>

                        <div className='d-flex justify-content-center '>
                        <GoogleLogin
                          onSuccess={credentialResponse => {
                            const result = jwtDecode(credentialResponse.credential)
                            setLoginStatus(result)
                            console.log(result);
                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }}
                        />
                        </div>

                        <p className='mt-3 text-center'>Already have an Account? click here to <Link to={'/'} className='text-info'>Login</Link></p>
                      </div> :
                      <div>
                      <button onClick={handleLogin} className='btn btn-dark mb-2  ps-5 pe-5'>Login </button>
                        <p className='text-center'>or</p>

                       <div className='d-flex justify-content-center'>
                          <GoogleLogin
                            onSuccess={credentialResponse => {
                              const result = jwtDecode(credentialResponse.credential)
                              setLoginStatus(result)
                              console.log(result);
                            }}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                          />
                       </div>
                       
                        <p className='mt-4 text-center'>Don't have an account? click here to <Link to={'/register'} className='text-info'>Sign Up</Link></p>
                      </div>
                  }
                </Form>


              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} theme='colored' />
      </div>
    </>
  )
}

export default Auth