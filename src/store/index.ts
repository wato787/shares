import drawerSlice from '@/slice/drawerSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
