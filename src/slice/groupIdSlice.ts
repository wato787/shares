import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupState {
  groupId: string | null;
}

const initialState: GroupState = {
  groupId: null,
};

const groupIdSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupId: (state, action: PayloadAction<string | null>) => {
      state.groupId = action.payload;
    },
  },
});

export const { setGroupId } = groupIdSlice.actions;

export default groupIdSlice.reducer;
