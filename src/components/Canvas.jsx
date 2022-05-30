import { useEffect, useRef } from 'react'
import { canvasSet } from '../redux/slices/canvasSlice'
import { toolSet } from '../redux/slices/toolsSlice'
import '../scss/canvas.scss'
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Rect from '../tools/Rect'

const Canvas = () => {

  const canvasRef = useRef()

  useEffect(() => {

    canvasSet(canvasRef.current)
    toolSet(new Circle(canvasRef.current)) // присваиваю состоянию кисть
  }, [])

  return (
    <div className='canvas'>
        <canvas ref={canvasRef} width={1700} height = {800}/>
    </div>
  )
}

export default Canvas