import React from 'react'
import Image from 'next/image'

const GreetingsImage = () => {
  return (
    <section
      id='GreetingsImage'
      className='bg-neutral-100 p-6 rounded-3xl mt-8 shadow-md flex justify-center h-80'
    >
      <div className='relative w-full max-w-md h-64'>
        <Image
          src='/images/hello.png'
          alt='Hero visual'
          fill
          className='rounded-2xl object-contain'
        />
      </div>
    </section>
  )
}

export default GreetingsImage
