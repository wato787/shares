import { CostData } from '@/types/type';
import { CostType } from '@/utils/CostType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface costDataState {
  thisMonthData: CostData[];
  allCostData: CostData[];
  groupedCostData?: groupedCostData;
}

type groupedCostData = {
  year: string;
  data: {
    month: string;
    rent: number; //家賃は別でいいかも
    food: number; //食費
    miscellaneous: number; //雑費
    water: number; //水道代
    gas: number; //ガス代
    utilities: number; //光熱費
    total: number; //合計
  }[];
};

const initialState: costDataState = {
  thisMonthData: [],
  allCostData: [],
  groupedCostData: undefined,
};

const costDataSlice = createSlice({
  name: 'thisMonthData',
  initialState,
  reducers: {
    setThisMonthData: (state, action: PayloadAction<CostData[]>) => {
      state.thisMonthData = action.payload;
    },
    setAllCostData: (state, action: PayloadAction<CostData[]>) => {
      state.allCostData = action.payload;
    },
    groupingCostData: (state, action: PayloadAction<CostData[]>) => {
      const costData = action.payload;
      const groupedCostData: groupedCostData = {
        year: '',
        data: [],
      };

      costData.forEach((data) => {
        const year = data.createdAt.slice(0, 4);
        const month = data.createdAt.slice(6, 7);
        const costType = data.costType;
        const amount = data.amount;

        const existingGroup = groupedCostData.data.find(
          (group) => group.month === month
        );

        if (existingGroup) {
          // 既存のグループを更新
          switch (costType) {
            case CostType.RENT:
              existingGroup.rent += amount;
              break;
            case CostType.FOOD:
              existingGroup.food += amount;
              break;
            case CostType.MISCELLANEOUS:
              existingGroup.miscellaneous += amount;
              break;
            case CostType.WATER:
              existingGroup.water += amount;
              break;
            case CostType.GAS:
              existingGroup.gas += amount;
              break;
            case CostType.UTILITIES:
              existingGroup.utilities += amount;
              break;
            default:
              break;
          }
          existingGroup.total =
            existingGroup.rent +
            existingGroup.food +
            existingGroup.miscellaneous +
            existingGroup.water +
            existingGroup.gas +
            existingGroup.utilities;
        } else {
          // 新しいグループを作成
          const newGroup = {
            month: month,
            rent: costType === CostType.RENT ? amount : 0,
            food: costType === CostType.FOOD ? amount : 0,
            miscellaneous: costType === CostType.MISCELLANEOUS ? amount : 0,
            water: costType === CostType.WATER ? amount : 0,
            gas: costType === CostType.GAS ? amount : 0,
            utilities: costType === CostType.UTILITIES ? amount : 0,
            total: amount,
          };
          groupedCostData.data.push(newGroup);
        }

        // 全体の年を設定（最後の要素の年を使用）
        groupedCostData.year = year;
      });

      state.groupedCostData = groupedCostData;
    },
  },
});

export const { setThisMonthData, setAllCostData, groupingCostData } =
  costDataSlice.actions;

export default costDataSlice.reducer;
