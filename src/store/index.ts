import drawerSlice from '@/slice/drawerSlice';
import groupDataSlice from '@/slice/groupDataSlice';
import groupIdSlice from '@/slice/groupIdSlice';
import groupUsersSlice from '@/slice/groupUsersSlice';
import costDataSliceReducer from '@/slice/costDataSlice';
import userSlice from '@/slice/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    userId: userSlice,
    groupId: groupIdSlice,
    groupData: groupDataSlice,
    groupUsers: groupUsersSlice,
    costData: costDataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
