import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    open: true,
  } as { open: boolean }, // 状態の型注釈を追加
  reducers: {
    toggleDrawer: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
