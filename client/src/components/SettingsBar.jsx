import { useDispatch, useSelector } from "react-redux";
import { toolLineWidth, toolStrokeColor } from "../redux/slices/toolsSlice";
import "../scss/toolbar.scss";

const SettingsBar = () => {
  const dispatch = useDispatch()
  const tool = useSelector((state) => state.tool.lineWidth)
  console.log(tool)


  return (
    <div className="settings-bar">
      <label htmlFor="line-width">Толщина линии</label>
      <input
        onChange={e => dispatch(toolLineWidth(e.target.value))}
        style={{ margin: "0 10px" }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input style={{ margin: "0 10px" }} onChange={e => dispatch(toolStrokeColor(e.target.value))} id='stroke-color' type='color'/>
    </div>
  );
};

export default SettingsBar;
