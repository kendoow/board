import { useSelector } from 'react-redux'
import { toolSet } from '../redux/slices/toolsSlice'
import '../scss/toolbar.scss'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'

const ToolBar = () => {
  
  const canvasState = useSelector((state) => state); 


  console.log(canvasState)
  return (
    <div className='toolbar'>
      {/* прокинуть состояния на кнопки */}
        <button className='toolbar__btn brush' onClick={() => toolSet(new Brush(canvasState))}/> 
        <button className='toolbar__btn rect' onClick={() => toolSet(new Rect(canvasState))}/>
        <button className='toolbar__btn circle'/>
        <button className='toolbar__btn eraser'/>
        <button className='toolbar__btn line'/>
        <input style={{marginLeft:10}} type="color" />
        <button className='toolbar__btn undo'/>
        <button className='toolbar__btn redo'/>
        <button className='toolbar__btn save'/>
    </div>
  )
}

export default ToolBar