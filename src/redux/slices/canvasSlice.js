import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canvas: 1,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    canvasSet: (state, action) => {state.canvas = action.payload},
    //canvasSet - actionCreator, внутри действие которое работает со стейтом 
  },
});

const {actions, reducer} = canvasSlice // разделяем слайс на части(экшоны и редюсеры)

// экспорт
export default reducer
export const {canvasSet,canvas} = actions
