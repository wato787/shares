import drawerSlice from '@/slice/drawerSlice';
import groupDataSlice from '@/slice/groupDataSlice';
import groupIdSlice from '@/slice/groupIdSlice';
import groupUsersSlice from '@/slice/groupUsersSlice';
import thisMonthDataSlice from '@/slice/thisMonthDataSlice';
import userSlice from '@/slice/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    userId: userSlice,
    groupId: groupIdSlice,
    groupData: groupDataSlice,
    groupUsers: groupUsersSlice,
    thisMonthData: thisMonthDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
