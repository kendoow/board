import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canvas: null,
  undoList: [], // дейстия которые мы когда либо делали
  redoList: [], // отмененные действия
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    canvasSet: (state, action) => {
      // метод у объекта
      //canvasSet - actionCreator, внутри действие которое работает со стейтом
      state.canvas = action.payload;
      
    },
    canvasPushToUndo: (state, action) => {
      state.undoList.push(action.payload);
    },
    canvasPushToRedo: (state, action) => {
      state.redoList.push(action.payload);
    },
    canvasUndo(state) {
      let ctx = state.canvas.getContext("2d"); // получаю контекст
      if (state.undoList.length > 0) {
        // есть ли что-то внутри массива?
        let dataUrl = state.undoList.pop(); // если в массиве что-то есть, достаем из него 1 элемент(последнее действие сделанное пользователем)
        state.redoList.push(state.canvas.toDataURL()); // после каждой отмены действия сохраняю его в массив отмененных действий
        let img = new Image();
        img.src = dataUrl // в src снимок последнего действия на канвасе
        console.log(dataUrl);
        console.log(state.undoList);
        img.onload = async () => { // когда изменное изображение с src загрузится, тогда 
          ctx.clearRect(0, 0, state.canvas.width, state.canvas.height); // отчищаем весь канвас чтобы избавиться от лишнего действия
          ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height); // передаем измененное изображение 
        }
      } else {
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height); // отчистка канваса если массив пустой
      }
    },
    canvasRedo(state) {
      let ctx = state.canvas.getContext("2d");
      if (state.redoList.length > 0) {
        // если в массиве что-то есть, достаем из него 1 элемент(последнее действие сделанное пользователем)
        let dataUrl = state.redoList.pop();
        state.undoList.push(state.canvas.toDataURL());
        let img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
          ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height);
        };
      }
    },
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
} = actions;
