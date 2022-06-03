import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/ToolBar";
import "./scss/app.scss";
import { Routes, Route, Navigate } from "react-router-dom";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/:id"
          element={
            <>
              <ToolBar />
              <SettingsBar />
              <Canvas />
            </>
          }
        ></Route>
        <Route
          path="*"
          element={<Navigate to={`f${(+new Date()).toString(16)}`} />} // переводим дату в строку чтобы получить уникальную присвоить уникальный индентификатор 
        />
      </Routes>
    </div>
  );
};

export default App;
