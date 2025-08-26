import React from 'react'

const Header = () => {
  return (
    <header className=''>
      <div className='flex bg-neutral-100 p-2 justify-between items-center rounded-4xl shadow-md'>
        <div className='flex bg-amber-200 p-3 rounded-4xl w-60 items-center justify-center' >
          <h1 className=' text-xl font-extrabold tracking-tight'>Soul sync</h1>
        </div>
        <div className='flex '>
          <a className='flex bg-red-200 p-3 rounded-l-4xl w-30 items-center justify-center '>Home</a>
          <a className='flex bg-red-300 p-3 rounded-r-4xl w-30 items-center justify-center '>Dashboard</a>
        </div>
        <div className='flex gap-2'>
          <button className='flex bg-lime-200 p-3 rounded-4xl w-30 items-center justify-center '>Log In</button>
          <button className='flex bg-lime-200 p-3 rounded-4xl w-30 items-center justify-center' >Register</button>
        </div>
        
      </div>
    </header>
  )
}

export default Header
