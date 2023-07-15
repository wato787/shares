import React from 'react';

const ExpensesCard = () => {
  return (
    <div className='flex p-4 bg-white'>
      <div className='w-1/2 p-2 border-r'>
        <h2 className='text-2xl'>出費合計</h2>
        <div className='flex justify-end pr-4'>
          <h3 className='text-4xl font-bold '>100,000円</h3>
        </div>
      </div>

      <div className='w-1/2 p-4'>
        <h2 className='text-2xl'>残高</h2>
        <div className='flex justify-end pr-4'>
          <h3 className='text-4xl font-bold'>50,000円</h3>
        </div>
      </div>
    </div>
  );
};

export default ExpensesCard;
