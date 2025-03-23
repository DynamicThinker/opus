import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-black p-4 shadow-lg w-full rounded-lg mt-4'>
      <div className='flex justify-between items-center px-4'>
        <span className='font-bold font-sans text-2xl gradient-text'>OPUS</span>
        <div className='flex flex-row gap-8'>
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
      </div>
    </nav>
  )
}

export default Navbar