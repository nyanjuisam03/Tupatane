import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
function Login() {
  return (
    <div>
     <div>
        Login Now
     </div>
     <div>
        <Link to={'/signUp'}>
        New sign up Now
        </Link>
     </div>
    </div>
  )
}

export default Login
