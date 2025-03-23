import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import { toast } from 'react-hot-toast'
import Modal from 'react-modal'

const Paste = () => {
  const pastes = useSelector(state => state.paste.pastes)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPaste, setSelectedPaste] = useState(null)

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes({ id: pasteId }))
    toast.success("Paste deleted successfully")
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success("Copied to clipboard")
      })
      .catch(() => {
        toast.error("Failed to copy")
      })
  }

  function handleShare(paste) {
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
    <div className="bg-[#222629] min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search pastes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-black p-3 pl-5 rounded-lg mt-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div>
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste._id} 
                className="bg-gray-800 rounded-lg p-4 mb-4 shadow-md"
              >
                <div className="text-white font-bold mb-2">{paste.title}</div>
                <div className="text-gray-300 mb-3">{paste.content}</div>
                <div className="text-gray-500 mb-3">Created at: {new Date(paste.createdAt).toLocaleString()}</div>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-emerald-600 p-2 rounded-md text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button
                    className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleDelete(paste._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => openModal(paste)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-600 p-2 rounded-md text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={() => handleCopy(paste.content)}
                  >
                    Copy
                  </button>
                  <button
                    className="bg-white p-2 rounded-md text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={() => handleShare(paste)}
                  >
                    Share
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
        className="bg-black p-6 rounded-2xl min-w-[300px] sm:min-w-[400px] min-h-[300px] shadow-lg"
        overlayClassName="bg-opacity-80 fixed inset-0 flex justify-center items-center backdrop-blur-md"
      >
        {selectedPaste && (
          <div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">{selectedPaste.title}</h2>
              <p className="text-gray-300 mb-4">{selectedPaste.content}</p>
              <p className="text-gray-500">Created at: {new Date(selectedPaste.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-white p-2 rounded-md text-black hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onClick={() => handleCopy(selectedPaste.content)}
              >
                Copy
              </button>
              <button
                className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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