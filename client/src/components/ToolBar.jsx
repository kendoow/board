import { useDispatch, useSelector } from "react-redux";
import { canvasRedo, canvasUndo } from "../redux/slices/canvasSlice";
import {
  toolFillColor,
  toolSet,
  toolStrokeColor,
} from "../redux/slices/toolsSlice";
import "../scss/toolbar.scss";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Rect from "../tools/Rect";

const ToolBar = () => {
  const canvasState = useSelector((state) => state.canvas);
  const socketState = useSelector((state) => state.canvas.socket);
  const sessionState = useSelector((state) => state.canvas.sessionId);
  const dispatch = useDispatch();
  console.log(canvasState);


  const changeColor = (e) => {
    dispatch(toolStrokeColor(e.target.value));
    dispatch(toolFillColor(e.target.value));
  };

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL()
    console.log(dataUrl)
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = canvasState.sessionid + ".png"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

  return (
    <div className="toolbar">
      {/* прокинуть состояния на кнопки */}
      <button
        className="toolbar__btn brush"
        onClick={() =>
          dispatch(
            toolSet(new Brush(canvasState.canvas, socketState, sessionState))
          )
        }
      />
      <button
        className="toolbar__btn rect"
        onClick={() =>
          dispatch(
            toolSet(new Rect(canvasState.canvas, socketState, sessionState))
          )
        }
      />
      <button
        className="toolbar__btn circle"
        onClick={() => dispatch(toolSet(new Circle(canvasState.canvas)))}
      />
      <button
        className="toolbar__btn eraser"
        onClick={() => dispatch(toolSet(new Eraser(canvasState.canvas)))}
      />
      <button
        className="toolbar__btn line"
        onClick={() => dispatch(toolSet(new Line(canvasState.canvas)))}
      />
      <input
        onChange={(e) => changeColor(e)}
        style={{ marginLeft: 10 }}
        type="color"
      />
      <button
        className="toolbar__btn undo"
        onClick={() => dispatch(canvasUndo())}
      />
      <button
        className="toolbar__btn redo"
        onClick={() => dispatch(canvasRedo())}
      />
      <button onClick={() => download()} className="toolbar__btn save" />
    </div>
  );
};

export default ToolBar;
