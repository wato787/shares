import CostColorTitle from '@/components/atoms/CostColorTitle';
import { CostType } from '@/utils/CostType';
import { Card } from '@mui/material';

const TotalCard = () => {
  return (
    <Card>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5'>
        <span className='font-bold text-xl text-gray-600'>出費詳細</span>
        <div className='w-full space-y-4'>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle title='家賃' type={CostType.RENT} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle title='雑費' type={CostType.MISCELLANEOUS} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle title='水道代' type={CostType.WATER} />
            <span className='text-base '>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle title='光熱費' type={CostType.UTILITIES} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle title='ガス代' type={CostType.GAS} />
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <CostColorTitle title='食費' type={CostType.FOOD} />
            <span className='text-base'>100000円</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TotalCard;
