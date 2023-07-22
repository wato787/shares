import CostColorTitle from '@/components/atoms/CostColorTitle';
import { CostData, GroupData } from '@/types/type';
import { CostType } from '@/utils/CostType';
import { Card } from '@mui/material';
import { memo, useMemo } from 'react';

interface Props {
  groupData: GroupData;
  thisMonthData: CostData[];
}

interface CalcCost {
  type: CostType;
  totalCost: number;
}

const TotalCard = memo((props: Props) => {
  const calcedCost = useMemo((): CalcCost[] => {
    const calcCost: CalcCost[] = [
      { type: CostType.MISCELLANEOUS, totalCost: 0 },
      { type: CostType.WATER, totalCost: 0 },
      { type: CostType.UTILITIES, totalCost: 0 },
      { type: CostType.GAS, totalCost: 0 },
      { type: CostType.FOOD, totalCost: 0 },
      { type: CostType.COMMUNICATION, totalCost: 0 },
      { type: CostType.OTHER, totalCost: 0 },
    ];

    props.thisMonthData.forEach((data) => {
      switch (data.costType) {
        case CostType.MISCELLANEOUS:
          calcCost[0].totalCost += data.amount;
          break;
        case CostType.WATER:
          calcCost[1].totalCost += data.amount;
          break;
        case CostType.UTILITIES:
          calcCost[2].totalCost += data.amount;
          break;
        case CostType.GAS:
          calcCost[3].totalCost += data.amount;
          break;
        case CostType.FOOD:
          calcCost[4].totalCost += data.amount;
          break;
        case CostType.COMMUNICATION:
          calcCost[5].totalCost += data.amount;
          break;
        case CostType.OTHER:
          calcCost[6].totalCost += data.amount;
          break;
        default:
          break;
      }
    });
    return calcCost;
  }, [props.thisMonthData]);

  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5'>
        <span className='font-bold text-xl text-gray-600'>出費詳細</span>
        <div className='w-full space-y-4'>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.RENT} />
            <span className='text-lg '>
              ¥
              {props.groupData.rentCost
                ? props.groupData.rentCost.toLocaleString()
                : 0}
            </span>
          </div>
          {calcedCost.map((item) => (
            <div
              className='flex items-center justify-between border-b px-1 pb-2'
              key={item.type}
            >
              <CostColorTitle type={item.type} />
              <span className='text-base'>
                ¥{item.totalCost.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
});

export default TotalCard;
