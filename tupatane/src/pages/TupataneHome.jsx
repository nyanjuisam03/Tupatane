import React from 'react'
import { Link } from 'react-router-dom'

function TupataneHome() {
  return (
    <div className='flex'>
      <div className='flex flex-col'>
        Join a group
        <Link to="/tupatane-joinGroup">
        <button className="btn bg-orange-500 text-white">Join a group</button>
        </Link>
      </div>
      <div className='flex flex-col mx-12'>
        Create a group
        <Link to={'/tupatane-makeGroup'}>
        <button className="btn bg-orange-500 text-white">Create a group</button>
        </Link>
      </div>
    </div>
  )
}

export default TupataneHome
