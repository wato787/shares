import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserIdType = {
  userId: string | undefined | null;
};

const initialState: UserIdType = {
  userId: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
