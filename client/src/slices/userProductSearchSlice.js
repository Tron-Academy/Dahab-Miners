import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturerOptions: "ALL",
  cryptoCurrencyOption: "ALL",
  keyWord: "",
  sortby: "Newest",
};

const userProductSearch = createSlice({
  name: "userProductSearch",
  initialState,
  reducers: {
    setKeyWord: (state, { payload }) => {
      state.keyWord = payload;
    },
    setManufacturerOptions: (state, { payload }) => {
      state.manufacturerOptions = payload;
    },
    setCryptoCurrencyOption: (state, { payload }) => {
      state.cryptoCurrencyOption = payload;
    },
    setSortBy: (state, { payload }) => {
      state.sortby = payload;
    },
    resetAll: (state) => {
      state.keyWord = "";
      state.manufacturerOptions = "ALL";
      state.cryptoCurrencyOption = "ALL";
      state.sortby = "Newest";
    },
  },
});

export default userProductSearch.reducer;
export const {
  setCryptoCurrencyOption,
  setKeyWord,
  setManufacturerOptions,
  setSortBy,
  resetAll,
} = userProductSearch.actions;
