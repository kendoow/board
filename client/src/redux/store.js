import { configureStore } from '@reduxjs/toolkit'
import tool from './slices/toolsSlice'
import canvas from './slices/canvasSlice'

const store = configureStore({
  reducer: {tool, canvas},
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store