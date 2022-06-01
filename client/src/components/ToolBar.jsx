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
  const toolState = useSelector((state) => state.tool);
  const dispatch = useDispatch();

  const changeColor = (e) => {
    dispatch(toolStrokeColor(e.target.value));
    dispatch(toolFillColor(e.target.value));
  };
  return (
    <div className="toolbar">
      {/* прокинуть состояния на кнопки */}
      <button
        className="toolbar__btn brush"
        onClick={() => dispatch(toolSet(new Brush(canvasState.canvas)))}
      />
      <button
        className="toolbar__btn rect"
        onClick={() => dispatch(toolSet(new Rect(canvasState.canvas)))}
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
      <button className="toolbar__btn undo" onClick={() => dispatch(canvasUndo())}/>
      <button className="toolbar__btn redo" onClick={() => dispatch(canvasRedo())}/>
      <button className="toolbar__btn save" />
    </div>
  );
};

export default ToolBar;
