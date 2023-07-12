import drawerSlice from '@/slice/drawerSlice';
import groupIdSlice from '@/slice/groupIdSlice';
import userSlice from '@/slice/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    groupId: groupIdSlice,
    userId: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
