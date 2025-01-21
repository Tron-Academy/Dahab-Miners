import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  btcData2: [],
  difficulty: 0,
  block_reward: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setBtcData2: (state, { payload }) => {
      state.btcData2 = payload;
    },
    setDifficulty: (state, { payload }) => {
      state.difficulty = payload;
    },
    setBlockReward: (state, { payload }) => {
      state.block_reward = payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setBtcData2, setDifficulty, setBlockReward } =
  userSlice.actions;
