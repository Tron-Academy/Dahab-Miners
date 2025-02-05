import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPopup: false,
  dataId: "",
  refetchTrigger: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setShowPopupTrue: (state) => {
      state.showPopup = true;
    },
    setShowPopupFalse: (state) => {
      state.showPopup = false;
    },
    setDataId: (state, { payload }) => {
      state.dataId = payload;
    },
    setRefetchTrigger: (state) => {
      state.refetchTrigger = !state.refetchTrigger;
    },
  },
});

export default adminSlice.reducer;
export const {
  setDataId,
  setShowPopupFalse,
  setShowPopupTrue,
  setRefetchTrigger,
} = adminSlice.actions;
