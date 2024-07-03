import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import HomePage from './Pages/HomePage'
import ExplorePage from './Pages/ExplorePage'
import LikesPage from './Pages/LikesPage'


function App() {

  return (
    <div className='flex '>
    <Sidebar/>
    <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/explore' element={<ExplorePage />} />
      <Route path='/likes' element={<LikesPage />} />
      </Routes>
    </div>

    </div>
  )
}

export default App
