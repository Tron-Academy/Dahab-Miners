import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturerOptions: "ALL",
  cryptoCurrencyOption: "ALL",
  categoryOptions: "ALL",
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
    setCategoryOptions: (state, { payload }) => {
      state.categoryOptions = payload;
    },
    setSortBy: (state, { payload }) => {
      state.sortby = payload;
    },
    resetAll: (state) => {
      state.keyWord = "";
      state.manufacturerOptions = "ALL";
      state.cryptoCurrencyOption = "ALL";
      state.categoryOptions = "ALL";
      state.sortby = "Newest";
    },
  },
});

export default userProductSearch.reducer;
export const {
  setCryptoCurrencyOption,
  setKeyWord,
  setManufacturerOptions,
  setCategoryOptions,
  setSortBy,
  resetAll,
} = userProductSearch.actions;
