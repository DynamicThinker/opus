import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams(); 
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector(state => state.paste.pastes);

  useEffect(() => {
    if(pasteId) {
      const paste = allPastes.find(paste => paste._id === pasteId);
      if(paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    } 
  }, [pasteId, allPastes])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully");
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className='flex flex-col gap-5 p-6 rounded-lg'>   
      <div className='flex flex-row gap-5 items-center'>  
        <input 
          type="text" 
          placeholder="Title" 
          className='bg-black p-3 pl-5 rounded-lg mt-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className='p-3 rounded-2xl mt-2 gradient-text-btn text-black font-bold hover:gradient-text-btn'>      
          {pasteId ? "Update" : "Create"}
        </button>
      </div>
      <div className='flex flex-col gap-2 min-w-[800px]'>
        <textarea
          placeholder="Your paste goes here..."
          className='bg-black p-4 rounded-lg mt-4 text-white w-full h-64 focus:outline-none focus:ring-2 focus:ring-emerald-500'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home