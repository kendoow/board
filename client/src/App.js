import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/ToolBar";
import "./scss/app.scss";

const App = () => {
  return (
    <div className="app">
      <ToolBar />
      <SettingsBar />
      <Canvas />
    </div>
  );
};

export default App;
