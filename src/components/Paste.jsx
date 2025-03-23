import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import { toast } from 'react-hot-toast'
import Modal from 'react-modal'
import { IoCopy } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Paste = () => {
  console.log("Paste component rendered");

  const pastes = useSelector(state => state.paste.pastes)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPaste, setSelectedPaste] = useState(null)

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    console.log("handleDelete called");
    dispatch(removeFromPastes({ id: pasteId }))
    toast.success("Paste deleted successfully")
  }

  function handleCopy(content) {
    console.log("handleCopy called");
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success("Copied to clipboard")
      })
      .catch(() => {
        toast.error("Failed to copy")
      })
  }

  function handleShare(paste) {
    console.log("handleShare called");
    const toastId = toast.loading("Sharing...")
    navigator.share({
      title: paste.title,
      text: paste.content,
    })
      .then(() => {
        toast.dismiss(toastId)
        toast.success("Shared successfully")
      })
      .catch(() => {
        toast.dismiss(toastId)
        toast.error("Failed to share")
      })
  }

  function openModal(paste) {
    setSelectedPaste(paste)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedPaste(null)
  }

  return (
    <div className="bg-[#222629] min-h-screen py-8 px-8 pt-30 hide-scrollbar">
      <div className="max-w-3xl mx-auto mb-5">
        <input
          type="text"
          placeholder="Search pastes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-neutral-900 p-3 pl-5 rounded-lg mt-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div>
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste._id} 
                className="bg-black rounded-lg p-4 mb-4 shadow-lg"
              >
                <div className="text-white font-bold mb-2">{paste.title}</div>
                <div className="text-gray-300 mb-3">{paste.content}</div>
                <div className="text-gray-500 mb-3">Created at: {new Date(paste.createdAt).toLocaleString()}</div>
                <div className="flex flex-wrap gap-5">
                  <button className="p-3 text-emerald-400 scale-140 rounded-md hover: transform hover:scale-170">
                    <a href={`/?pasteId=${paste?._id}`}><FaEdit /></a>
                  </button>
                  <button
                    className="p-3 text-red-500 scale-140 rounded-md hover: transform hover:scale-170"
                    onClick={() => handleDelete(paste._id)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="p-3 text-yellow-300 scale-140 rounded-md hover: transform hover:scale-160"
                    onClick={() => openModal(paste)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="p-3 scale-130 rounded-md hover: transform hover:scale-160 "
                    onClick={() => handleCopy(paste.content)}
                  >
                    <IoCopy />
                  </button>
                  <button
                    className="p-2 scale-130 rounded-md text-cyan-400 hover:scale-160 focus:outline-none"
                    onClick={() => handleShare(paste)}
                  >
                    <FaShare />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 mt-4">No pastes found matching your search.</div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="View Paste"
        className="bg-black p-6 rounded-2xl min-w-[300px] sm:min-w-[380px] min-h-[310px] shadow-lg"
        overlayClassName="bg-opacity-80 fixed inset-0 flex justify-center items-center backdrop-blur-md"
      >
        {selectedPaste && (
          <div className='flex flex-col gap-12'>
            <div>
              <h2 className="text-white text-2xl font-bold mb-4 ">{selectedPaste.title}</h2>
              <p className="text-gray-300 mb-4">{selectedPaste.content}</p>
              <p className="text-gray-500">Created at: {new Date(selectedPaste.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2 mt-4 justify-between">
              <button
                className="bg-white px-6 py-2 rounded-md text-black hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onClick={() => handleCopy(selectedPaste.content)}
              >
                Copy
              </button>
              <button
                className="bg-red-600 px-6 py-2 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Paste