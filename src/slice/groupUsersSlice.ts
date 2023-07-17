import { createSlice } from '@reduxjs/toolkit';

type GroupUsersState = {
  id: string;
  name: string;
  photoUrl: string;
  position: string;
}[];

const initialState: GroupUsersState = [];

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
