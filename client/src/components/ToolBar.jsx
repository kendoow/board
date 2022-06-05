import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { canvasPushToUndo, canvasRedo, canvasUndo } from "../redux/slices/canvasSlice";
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

  const params = useParams();

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
  const сlearCanvas = () => {
    const ctx = canvasState.canvas.getContext("2d");
     ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height);
     dispatch(canvasPushToUndo(canvasState.canvas.toDataURL())); // делаю снимок пустого канваса и добавляю его в состояние(показываю отчищенный)
    axios
      .post(`http://localhost:5000/image?id=${params.id}`, {
        img: canvasState.canvas.toDataURL(), // отправляю пустой хост на сервер
      })
      .then((res) => console.log(res.data));
  }

  return (
    <div className="toolbar">
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
        onClick={() => dispatch(toolSet(new Circle(canvasState.canvas,socketState, sessionState)))}
      />
      <button
        className="toolbar__btn eraser"
        onClick={() => dispatch(toolSet(new Eraser(canvasState.canvas,socketState,sessionState)))}
      />
      <button
        className="toolbar__btn line"
        onClick={() => dispatch(toolSet(new Line(canvasState.canvas, socketState, sessionState)))}
      />
      <div className="">
      <input
      className="color"
        onChange={(e) => changeColor(e)}
        type="color"
      />
      </div>
      <button
        className="toolbar__btn undo"
        onClick={() => dispatch(canvasUndo())}
      />
      <button
        className="toolbar__btn redo"
        onClick={() => dispatch(canvasRedo())}
      />
       <button
        className="toolbar__btn clear"
        onClick={() => сlearCanvas()}
      />
      <button onClick={() => download()} className="toolbar__btn save" />
    </div>
  );
};

export default ToolBar;
