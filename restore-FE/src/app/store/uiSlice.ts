import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isLoading: boolean;
  darkMode: boolean;
}

const initialState: UIState = {
  isLoading: false,
  darkMode: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setLoading, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
