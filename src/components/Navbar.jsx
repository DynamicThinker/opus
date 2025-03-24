import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    console.log('Menu clicked')
    setIsOpen(!isOpen)
  }

  return (
    <nav className='bg-black p-4 shadow-lg w-auto rounded-lg mt-2 fixed top-0 left-0 right-0 z-50 mx-4'>
      <div className='flex justify-between items-center px-4'>
        <span className='font-bold font-sans text-3xl gradient-text'>OPUS</span>
        
        <div className='hidden md:flex flex-row gap-8'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-emerald-500 transition duration-300 ${isActive ? 'text-emerald-500 font-semibold' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-white hover:text-emerald-500 transition duration-300 ${isActive ? 'text-emerald-500 font-semibold' : ''}`
            }
          >
            Pastes
          </NavLink>
        </div>
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-white focus:outline-none'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden flex flex-col gap-4 mt-4 px-4'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-emerald-500 transition duration-300 ${isActive ? 'text-emerald-500 font-semibold' : ''}`
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-white hover:text-emerald-500 transition duration-300 ${isActive ? 'text-emerald-500 font-semibold' : ''}`
            }
            onClick={toggleMenu}
          >
            Pastes
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar