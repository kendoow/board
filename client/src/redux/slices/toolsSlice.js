import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: null,
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    toolSet: (state,action) => { state.tool = action.payload }, //toolSet - actionCreator, внутри действие которое работает со стейтом 
    toolFillColor:(state,action) => {state.tool.fillColor =  action.payload}, // у контекста в канвас есть свойство fillColor
    toolStrokeColor:(state,action) => {state.tool.strokeColor =  action.payload}, 
    toolLineWidth:(state,action) => {state.tool.lineWidth = action.payload}
  },
});

const {actions, reducer} = toolSlice // разделяем слайс на части(экшоны и редюсеры)

// экспорт
export default reducer
export const {toolSet,toolFillColor,toolStrokeColor,toolLineWidth} = actions
