import React from 'react'
import banner from '../assets/banner.jpg'

function Banner() {
  return (
    <div className='w-full flex justify-center mt-8 mb-8'>
        <img src={banner} alt="Banner" className='max-w-7xl h-auto object-cover rounded-lg shadow-md' />
    </div>
  )
}

export default Banner