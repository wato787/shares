import { GroupUsers } from '@/types/type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: GroupUsers = [];

const groupUsersSlice = createSlice({
  name: 'groupUsers',
  initialState,
  reducers: {
    setGroupUsers: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setGroupUsers } = groupUsersSlice.actions;

export default groupUsersSlice.reducer;
