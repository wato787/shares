import CostHistory from '@/components/organisms/card/CostHistory';
import PaymentHistory from '@/components/organisms/card/PaymentHistory';
import PageLayout from '@/components/templates/PageLayout';
import { Current } from '@/types/type';

import React, { ReactElement } from 'react';

const History = ({ current }: Current): ReactElement => {
  return (
    <PageLayout current={current} grayBg>
      <>
        <div className='flex'>
          <div className='flex-initial w-1/2 m-1 p-5 '>
            <CostHistory current={current}/>
          </div>
          <div className='flex-initial w-1/2 m-1 p-5'>
            <PaymentHistory current={current} />
          </div>
        </div>
      </>
    </PageLayout>
  );
};

export default History;
