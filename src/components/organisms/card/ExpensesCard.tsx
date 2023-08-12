import { Button } from '@mui/material';
import React, { memo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BankBalanceDialog from '@/components/molucules/BankBalanceDialog';
import { GroupData } from '@/types/type';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MonthTotalCost } from '@/utils/MonthTotalCost';

interface Props {
  groupData: GroupData;
}

const ExpensesCard = memo((props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const thisMonthData = useSelector(
    (state: RootState) => state.costData.thisMonthData
  );
  const { groupData } = useSelector((state: RootState) => state.groupData);

  const rentCost = groupData.rentCost ?? 0;
  const thisMonthTotalCost = MonthTotalCost(thisMonthData) + rentCost;

  return (
    <div className='flex p-4 bg-white shadow rounded'>
      <div className='w-1/2 p-2 border-r'>
        <h2 className='text-2xl'>出費合計</h2>
        <div className='flex justify-end pr-4 pt-2'>
          <h3 className='text-4xl font-bold'>
            {thisMonthTotalCost.toLocaleString()}
            <span className='text-base ml-2'>円</span>
          </h3>
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
            {props.groupData?.bankBalance
              ? props.groupData.bankBalance.toLocaleString()
              : 0}
            <span className='text-base ml-2'>円</span>
          </h3>
        </div>
      </div>
      <BankBalanceDialog open={open} onClose={(): void => setOpen(false)} />
    </div>
  );
});

export default ExpensesCard;
