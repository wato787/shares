import CostColorTitle from '@/components/atoms/CostColorTitle';
import { GroupData } from '@/types/type';
import { CostType } from '@/utils/CostType';
import { Card } from '@mui/material';
import { memo } from 'react';

interface Props {
  groupData: GroupData;
}

const TotalCard = memo((props: Props) => {
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
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.MISCELLANEOUS} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.WATER} />
            <span className='text-base '>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.UTILITIES} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.GAS} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.FOOD} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.COMMUNICATION} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle type={CostType.OTHER} />
            <span className='text-base'>100000円</span>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default TotalCard;
