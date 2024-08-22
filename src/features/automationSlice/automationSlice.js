import { createSlice } from '@reduxjs/toolkit';

const automationSlice = createSlice({
  name: 'automation',
  initialState: [],
  reducers: {
    addAction: (state, action) => {
      state.push(action.payload);
    },
    updateAction: (state, action) => {
      return state.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAction: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addAction, updateAction, removeAction } = automationSlice.actions;
export default automationSlice.reducer;
