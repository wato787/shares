import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BankAccountDialog from '@/components/molucules/BankAccountDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ExpensesCard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { groupData } = useSelector((state: RootState) => state.groupData);

  return (
    <div className='flex p-4 bg-white shadow rounded'>
      <div className='w-1/2 p-2 border-r'>
        <h2 className='text-2xl'>出費合計</h2>
        <div className='flex justify-end pr-4'>
          <h3 className='text-4xl font-bold pt-2'>100,000円</h3>
        </div>
      </div>

      <div className='w-1/2 p-2 pl-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl'>残高</h2>
          <Button onClick={() => setOpen(true)} startIcon={<AddIcon />}>
            追加
          </Button>
        </div>
        <div className='flex justify-end pr-4 pt-2'>
          <h3 className='text-4xl font-bold'>
            {groupData.bankBalance?.toLocaleString()}
            <span className='text-base ml-2'>円</span>
          </h3>
        </div>
      </div>
      <BankAccountDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ExpensesCard;
