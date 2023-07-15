import { Card } from '@mui/material';

const TotalCard = () => {
  return (
    <div className='w-1/3 '>
      <Card sx={{ height: '500px' }}>
        <div className='p-5 flex flex-col items-center justify-center gap-y-5'>
          <span className='font-bold text-xl text-gray-600'>出費詳細</span>
          <div className='w-full space-y-4'>
            <div className='flex items-center justify-between border-b p-1'>
              <span className='text-gray-600 font-bold'>家賃</span>
              <span className='text-base'>100000円</span>
            </div>
            <div className='flex items-center justify-between border-b p-1'>
              <span className='text-gray-600 font-bold'>雑費</span>
              <span className='text-base'>100000円</span>
            </div>
            <div className='flex items-center justify-between border-b p-1'>
              <span className='text-gray-600 font-bold'>水道光熱費</span>
              <span className='text-base'>100000円</span>
            </div>
            <div className='flex items-center justify-between border-b p-1'>
              <span className='text-gray-600 font-bold'>ガス代</span>
              <span className='text-base'>100000円</span>
            </div>
            <div className='flex items-center justify-between border-b p-1'>
              <span className='text-gray-600 font-bold'>食費</span>
              <span className='text-base'>100000円</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TotalCard;
