import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div className="flex flex-col h-full"> 
        <Navbar />
        <div className="flex-grow overflow-y-auto"> 
          <Home />
        </div>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div className="flex flex-col h-full">
        <Navbar />
        <div className="flex-grow overflow-y-auto"> 
          <Paste />
        </div>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div className="flex flex-col h-full"> 
        <Navbar />
        <div className="flex-grow overflow-y-auto"> 
          <ViewPaste />
        </div>
      </div>
    },

]
)

function App() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#222629] text-white font-mono'>
      <div className="w-full max-w-[1300px] flex flex-col h-full"> 
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
