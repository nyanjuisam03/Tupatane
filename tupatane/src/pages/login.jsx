import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { FaGoogle } from "react-icons/fa";
function Login() {
  return (
    <div className='flex justify-center'>
     <div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-3 my-5">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span>Login</span>
          </label>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label ">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            <a href="#" className="label-text-alt link link-hover">Create an Account</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-orange-500 text-white">Login</button>
        </div>
        <button className="btn bg-orange-500 text-white "><FaGoogle /> Login using Google</button>
      </form>
      
    </div>
    
     </div>
     
    </div>
  )
}

export default Login
