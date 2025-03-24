import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <div className="flex flex-col h-full max-w-full overflow-x-hidden">
          <Navbar />
          <div className="flex-grow overflow-y-auto">
            <Home />
          </div>
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div className="flex flex-col h-full max-w-full overflow-x-hidden">
          <Navbar />
          <div className="flex-grow overflow-y-auto">
            <Paste />
          </div>
        </div>
      ),
    },
  ]
)

function App() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#222923] text-white font-mono'>
      <div className="w-full flex flex-col h-full max-w-full overflow-x-hidden">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App