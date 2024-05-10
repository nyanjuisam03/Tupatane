import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <div className='flex flex-col mx-4 md:mx-11 my-24'>
        <div className='text-xl md:text-2xl font-bold'>
        Welcome to <span className='bg-orange-500 p-2 text-white'>Tupatane</span>.
        </div>
    <div className='my-4 md:my-8 text-lg md:text-2xl font-bold'>
      Connect with <span className='bg-orange-500 p-2 text-white'>friends</span>, join
       <span className='bg-orange-500 p-2 text-white'>groups</span>, and discover new people. 
     <div className='my-4'>
     Join us and create memories together. 
     </div>
     </div>
     
     <button className='bg-orange-500 p-2 w-full md:w-44 rounded-lg text-white font-bold text-lg md:text-xl  mx-0 md:mx-7'><Link to={'/login'}>Start Now</Link></button>
    
    </div>
    </>
  )
}

export default Home
