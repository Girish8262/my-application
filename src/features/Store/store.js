import { configureStore } from '@reduxjs/toolkit';
import automationReducer from '../automationSlice/automationSlice';

export const store = configureStore({
  reducer: {
    automation: automationReducer,
  },
});
