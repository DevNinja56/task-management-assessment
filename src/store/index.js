import uiSlice from "./slices/ui.slice";
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    userInterface: uiSlice,
  },
});
