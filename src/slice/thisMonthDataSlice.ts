import { CostData } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface thisMonthDataState {
  thisMonthData: CostData[];
}

const initialState: thisMonthDataState = {
  thisMonthData: [],
};

const thisMonthDataSlice = createSlice({
  name: 'thisMonthData',
  initialState,
  reducers: {
    setThisMonthData: (state, action: PayloadAction<any>) => {
      state.thisMonthData = action.payload;
    },
  },
});

export const { setThisMonthData } = thisMonthDataSlice.actions;

export default thisMonthDataSlice.reducer;
