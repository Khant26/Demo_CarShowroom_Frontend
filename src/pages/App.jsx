import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'
import CarCategories from '../components/carCategories'

function App() {
  return (
    <div className='mx-auto max-w-4xl'>
      <Banner />
      <div className='text-center my-8'>
        <Link 
          to="/brands" 
          className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition-colors'
        >
          Browse All Cars
        </Link>
      </div>
      <CarCategories />
    </div>
  )
}


export default App