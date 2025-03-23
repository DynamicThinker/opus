import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload
      if (paste) {
        if (!paste.title || paste.title.trim() === "") {
          toast.error("Title cannot be empty")
          return
        }
        const existingPaste = state.pastes.find(p => p.title === paste.title)
        if (existingPaste) {
          toast.error("A paste with the same title already exists")
        } else {
          state.pastes.push(paste)
          localStorage.setItem("pastes", JSON.stringify(state.pastes))
        }
      }
    },
    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex(paste => paste._id === action.payload._id)
      if (index !== -1) {
        state.pastes[index] = action.payload
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
      } else {
        toast.error("Paste not found")
      }
    },
    resetAllPastes: (state) => {
      state.pastes = []
      localStorage.removeItem("pastes")
      toast.success("All pastes have been reset")
    },
    removeFromPastes: (state, action) => {
      state.pastes = state.pastes.filter(paste => paste._id !== action.payload.id)
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
    }
  },
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer