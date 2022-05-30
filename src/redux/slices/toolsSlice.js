import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: null,
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    toolSet: (state) => state.tool === state, //toolSet - actionCreator, внутри действие которое работает со стейтом 
  },
});

const {actions, reducer} = toolSlice // разделяем слайс на части(экшоны и редюсеры)

// экспорт
export default reducer
export const {toolSet} = actions
