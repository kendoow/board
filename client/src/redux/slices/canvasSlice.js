import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { canvasAsyncUndo } from "./canvasAsyncAction";


const initialState = {
  canvas: null,
  socket: null,
  sessionId: null,
  undoList: [], // дейстия которые мы когда либо делали
  redoList: [], // отмененные действия
  username: "",
};

const canvasSlice = createSlice({
  
  name: "canvas",
  initialState,
  reducers: {
    canvasSet: (state, action) => {
      state.canvas = action.payload;
    },
    canvasSetUsername: (state, action) => {
      state.username = action.payload;
    },
    canvasSetSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    canvasSetSocket: (state, action) => {
      state.socket = action.payload;
    },
    canvasPushToUndo: (state, action) => {
      state.undoList.push(action.payload);
    },
    canvasPushToRedo: (state, action) => {
      state.redoList.push(action.payload);
    },
    canvasUndo (state, action) {
      let ctx = state.canvas.getContext("2d"); // получаю контекст
      
      if (state.undoList.length) {
        // есть ли что-то внутри массива?
        let dataUrl = state.undoList.pop(); // если в массиве что-то есть, достаем из него 1 элемент(последнее действие сделанное пользователем)
        canvasPushToRedo(state.canvas.toDataURL()); // после каждой отмены действия сохраняю его в массив отмененных действий
        let img = new Image();
        img.src = dataUrl; // в src снимок последнего действия на канвасе
        // console.log(dataUrl);
        
        // canvasAsyncUndo(action.payload)
        
        // img.onload = () => {
        //   // когда изменное изображение с src загрузится, тогда
        //   ctx.clearRect(0, 0, state.canvas.width, state.canvas.height); // отчищаем весь канвас чтобы избавиться от лишнего действия
        //   ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height); // передаем измененное изображение
        // };
      } else {
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height); // отчистка канваса если массив пустой
      }
    },
    canvasRedo(state) {
      let ctx = state.canvas.getContext("2d");
      if (state.redoList.length) {
        // если в массиве что-то есть, достаем из него 1 элемент(последнее действие сделанное пользователем)
        let dataUrl = state.redoList.pop();
        canvasPushToUndo(state.canvas.toDataURL());
        // let img = new Image();
        // img.src = dataUrl;
        // console.log(dataUrl);
        // img.onload = () => {
        //   ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
        //   ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height);
        // };
      }
    },
    extraReducers: {
      [canvasAsyncUndo.fulfilled.type]: (state,action) => {
        console.log(1)
      }
    }
  },
});

const { actions, reducer } = canvasSlice; // разделяем слайс на части(экшены и редюсеры)

// экспорт
export default reducer;
export const {
  canvasSet,
  canvasPushToUndo,
  canvasPushToRedo,
  canvasUndo,
  canvasRedo,
  canvasSetUsername,
  canvasSetSocket,
  canvasSetSessionId,
} = actions;
