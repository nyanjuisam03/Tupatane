import React from 'react'
import { useState,useEffect } from 'react'

function Proflie() {
 const [ProfileData,SetProfileData]=useState({
    firstName:"",
    lastName:"",
    userName:"",
    bio:""
 })

 const handleChange = (e) => {
    const { name, value } = e.target;
    SetProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl mx-12 my-12">
  <div className="card-body">
    <h2 className="card-title">Create Your Profile</h2>
<span>First Name</span>
<input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name='firstName' value={ProfileData.firstName}  onChange={handleChange}/>
<span>Last Name</span>
<input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  name='lastName' value={ProfileData.lastName}  onChange={handleChange}/>
    <span>Create your username</span>
    <label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="Username" name='userName' value={ProfileData.userName} onChange={handleChange} />
</label>
<span>Your Bio</span>
<textarea className="textarea textarea-bordered" placeholder="Bio"  name='bio' value={ProfileData.bio} onChange={handleChange}></textarea>
    <div className="card-actions justify-end">
      <button className="btn bg-orange-500">Create your profile</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Proflie
