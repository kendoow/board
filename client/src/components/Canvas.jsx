import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { canvasPushToUndo, canvasSet } from "../redux/slices/canvasSlice";
import { toolSet } from "../redux/slices/toolsSlice";
import "../scss/canvas.scss";
import Brush from "../tools/Brush";


const Canvas = () => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const canvasRedo = useSelector((state) => state.canvas.canvasRedo)
  const canvass = useSelector((state) => state.canvas.canvas)

  useEffect(() => {
    dispatch(canvasSet(canvasRef.current));
    dispatch(toolSet(new Brush(canvasRef.current)));
    console.log(canvasRedo) // присваиваю состоянию кисть
    console.log(canvass)
  }, [canvasRedo,[]]);

  const mouseDownHandler = () => {
    dispatch(canvasPushToUndo(canvasRef.current.toDataURL())) // делаю снимок текущего канваса и добавляю его в состояние
  }
  
  return (
    <div className="canvas">
      <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={1800} height={900} />
    </div>
  );
};

export default Canvas;
