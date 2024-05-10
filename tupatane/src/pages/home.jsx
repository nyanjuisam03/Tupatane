import React from 'react'

function Home() {
  return (
    <>
    <div className='flex flex-col mx-11 my-24'>
        <div className='text-2xl font-bold'>
        Welcome to <span className='bg-orange-500 p-2 text-white'>Tupatane</span> .
        </div>
    <div className='my-8 text-2xl font-bold'>
      Connect with <span  className='bg-orange-500 p-2 text-white '> friends</span>, join
       <span  className='bg-orange-500 p-2 text-white'>groups</span>, and discover new people. 
     <div className='my-4'>
     Join us and creating memories together. 
     </div>
     </div>
     <button className='bg-orange-500 p-2 w-44 rounded-lg text-white font-bold text-xl  mx-7'>Start Now</button>
    </div>
    <div>
        
    </div>
    </>
  )
}

export default Home
