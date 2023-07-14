import { CostData } from '@/types/type';
import { CostType } from './CostType';

type groupedCostData = {
  year: string;
  data: {
    month: string;
    rentCost: number;
    foodCost: number;
    miscellaneousCost: number;
    waterCost: number;
    gasCost: number;
    utilitiesCost: number;
    totalCost: number;
  }[];
};

export const dammyData: CostData[] = [
  {
    date: '2021/1/1',
    cost: 14000,
    costType: CostType.RENT,
  },
  {
    date: '2021/1/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/1/1',
    cost: 34000,
    costType: CostType.FOOD,
  },
  {
    date: '2021/1/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/1/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/1/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/1/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/1/30',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/2/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/2/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/2/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/2/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/2/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/2/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/3/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/3/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/3/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/3/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/3/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/3/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/4/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/4/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/4/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/4/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/4/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/4/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/5/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/5/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/5/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/5/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/5/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/5/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/6/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/6/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/6/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/6/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/6/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/6/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/7/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/7/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/7/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/7/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/7/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/7/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/8/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/8/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/8/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/8/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/8/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/8/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/9/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/9/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/9/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/9/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/9/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/9/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/10/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/10/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/10/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/10/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/10/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/10/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/11/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/11/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/11/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/11/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/11/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/11/27',
    cost: 10000,
    costType: CostType.GAS,
  },
  {
    date: '2021/12/1',
    cost: 14000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/12/10',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/12/20',
    cost: 10000,
    costType: CostType.MISCELLANEOUS,
  },
  {
    date: '2021/12/25',
    cost: 10000,
    costType: CostType.WATER,
  },
  {
    date: '2021/12/26',
    cost: 10000,
    costType: CostType.UTILITIES,
  },
  {
    date: '2021/12/27',
    cost: 10000,
    costType: CostType.GAS,
  },
];

export const groupCostData = (data: CostData[]): groupedCostData[] => {
  const groupedData: groupedCostData[] = [];

  data.forEach((item) => {
    const [year, month, _] = item.date.split('/');
    const existingYearData = groupedData.find((d) => d.year === year);

    const monthLabel = getMonthLabel(month);

    if (existingYearData) {
      const existingMonthData = existingYearData.data.find(
        (c) => c.month === monthLabel
      );

      if (existingMonthData) {
        if (item.costType === CostType.RENT) {
          existingMonthData.rentCost += item.cost;
        } else if (item.costType === CostType.MISCELLANEOUS) {
          existingMonthData.miscellaneousCost += item.cost;
        } else if (item.costType === CostType.WATER) {
          existingMonthData.waterCost += item.cost;
        } else if (item.costType === CostType.GAS) {
          existingMonthData.gasCost += item.cost;
        } else if (item.costType === CostType.UTILITIES) {
          existingMonthData.utilitiesCost += item.cost;
        } else if (item.costType === CostType.FOOD) {
          existingMonthData.foodCost += item.cost;
        }
        existingMonthData.totalCost += item.cost; // 合計コストの追加
      } else {
        const newMonthData = {
          month: monthLabel,
          rentCost: item.costType === CostType.RENT ? item.cost : 0,
          miscellaneousCost:
            item.costType === CostType.MISCELLANEOUS ? item.cost : 0,
          waterCost: item.costType === CostType.WATER ? item.cost : 0,
          gasCost: item.costType === CostType.GAS ? item.cost : 0,
          utilitiesCost: item.costType === CostType.UTILITIES ? item.cost : 0,
          foodCost: item.costType === CostType.FOOD ? item.cost : 0,
          totalCost: item.cost, // 合計コストの初期値
        };
        existingYearData.data.push(newMonthData);
      }
    } else {
      const newGroupedData: groupedCostData = {
        year: year,
        data: [
          {
            month: monthLabel,
            rentCost: item.costType === CostType.RENT ? item.cost : 0,
            miscellaneousCost:
              item.costType === CostType.MISCELLANEOUS ? item.cost : 0,
            waterCost: item.costType === CostType.WATER ? item.cost : 0,
            gasCost: item.costType === CostType.GAS ? item.cost : 0,
            utilitiesCost: item.costType === CostType.UTILITIES ? item.cost : 0,
            foodCost: item.costType === CostType.FOOD ? item.cost : 0,
            totalCost: item.cost, // 合計コストの初期値
          },
        ],
      };
      groupedData.push(newGroupedData);
    }
  });

  return groupedData;
};

const getMonthLabel = (month: string): string => {
  const monthNumber = parseInt(month);
  const monthLabels = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ];

  return monthLabels[monthNumber - 1] || month;
};
