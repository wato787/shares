import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupDataState {
  groupData: {
    id: string;
    name: string;
    rentCost?: number;
  };
}

const initialState: GroupDataState = {
  groupData: {
    id: '',
    name: '',
    rentCost: 0,
  },
};

const groupDataSlice = createSlice({
  name: 'groupData',
  initialState,
  reducers: {
    setGroupData: (
      state,
      action: PayloadAction<GroupDataState['groupData']>
    ) => {
      state.groupData = action.payload;
    },
  },
});

export const { setGroupData } = groupDataSlice.actions;

export default groupDataSlice.reducer;
