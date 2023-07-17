import { createSlice } from '@reduxjs/toolkit';

type GroupUsersState = [
  {
    id: string;
    name: string;
    photoUrl: string;
    position: string;
  }
];

const initialState: GroupUsersState = [
  {
    id: '',
    name: '',
    photoUrl: '',
    position: '',
  },
];

const groupUsersSlice = createSlice({
  name: 'groupUsers',
  initialState,
  reducers: {
    setGroupUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGroupUsers } = groupUsersSlice.actions;

export default groupUsersSlice.reducer;
