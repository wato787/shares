import { CostData } from '@/types/type';

export const MonthTotalCost = (monthData: CostData[]) => {
  let totalCost = 0;
  monthData.forEach((data) => {
    totalCost += data.amount;
  });
  return totalCost;
};
