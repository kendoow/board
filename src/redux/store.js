import { configureStore } from '@reduxjs/toolkit'
import { toolSet } from './slices/toolsSlice'
import { canvasSet } from './slices/canvasSlice'

const store = configureStore({
  reducer: {toolSet, canvasSet} 
})

export default store