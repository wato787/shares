import { RootState } from '@/store';
import { Button, Card, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RentCard = () => {
  const [rentCost, setRentCost] = useState('');
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const [isChangeMode, setIsChangeMode] = useState(false);

  return (
    <Card>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
        <span className='font-bold text-xl text-gray-600'>家賃設定</span>
        {!isChangeMode ? (
          <div className='flex flex-col  w-full gap-y-5'>
            <div className='flex items-center justify-between  bg-secondary rounded p-4'>
              <span className='text-gray-500 font-bold text-base '>
                現在の設定家賃
              </span>
              <span className='text-gray-500 font-bold text-base'>
                1000000円
              </span>
            </div>
            <Button onClick={() => setIsChangeMode(true)}>変更する</Button>
          </div>
        ) : (
          <div className='w-full'>
            <form
              // onSubmit={addCost}
              className='flex flex-col  w-full space-y-7'
            >
              <TextField
                type='number'
                id='input-with-sx'
                label='金額'
                fullWidth
                value={rentCost}
                onChange={(e) => setRentCost(e.target.value as string)}
                // onSubmit={addCost}
              />
              <Button
                variant='contained'
                fullWidth
                // onClick={addCost}
                disabled={!rentCost}
                className='bg-primary hover:opacity-[0.99] text-white font-bold py-2 px-4 rounded'
              >
                変更
              </Button>
            </form>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RentCard;
