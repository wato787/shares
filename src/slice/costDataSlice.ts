import { CostData } from '@/types/type';
import { CostType } from '@/utils/CostType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface costDataState {
  thisMonthData: CostData[];
  allCostData: CostData[];
  groupedCostData?: groupedCostData[];
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
  groupedCostData: [],
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
      const groupingCostData: groupedCostData[] = [];

      costData.forEach((data) => {
        const year = data.createdAt.slice(0, 4);
        const month = data.createdAt.slice(6, 7);
        const costType = data.costType;
        const amount = data.amount;

        const existingGroup = groupingCostData.find(
          (group) => group.year === year
        );

        if (existingGroup) {
          // 既存のグループを更新
          const categoryData = existingGroup.data[0];
          switch (costType) {
            case CostType.RENT:
              categoryData.rent += amount;
              break;
            case CostType.FOOD:
              categoryData.food += amount;
              break;
            case CostType.MISCELLANEOUS:
              categoryData.miscellaneous += amount;
              break;
            case CostType.WATER:
              categoryData.water += amount;
              break;
            case CostType.GAS:
              categoryData.gas += amount;
              break;
            case CostType.UTILITIES:
              categoryData.utilities += amount;
              break;
            default:
              break;
          }
          categoryData.total =
            categoryData.rent +
            categoryData.food +
            categoryData.miscellaneous +
            categoryData.water +
            categoryData.gas +
            categoryData.utilities;
        } else {
          // 新しいグループを作成
          const newGroup: groupedCostData = {
            year: year,
            data: [
              {
                month: month,
                rent: costType === CostType.RENT ? amount : 0,
                food: costType === CostType.FOOD ? amount : 0,
                miscellaneous: costType === CostType.MISCELLANEOUS ? amount : 0,
                water: costType === CostType.WATER ? amount : 0,
                gas: costType === CostType.GAS ? amount : 0,
                utilities: costType === CostType.UTILITIES ? amount : 0,
                total: amount,
              },
            ],
          };
          groupingCostData.push(newGroup);
        }
      });

      state.groupedCostData = groupingCostData;
    },
  },
});

export const { setThisMonthData, setAllCostData, groupingCostData } =
  costDataSlice.actions;

export default costDataSlice.reducer;
