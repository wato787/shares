import CostHistory from '@/components/organisms/card/CostHistory';
import PaymentHistory from '@/components/organisms/card/PaymentHistory';
import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';

import React, { ReactElement } from 'react';

const History = ({ current }: Current): ReactElement => {
  return (
    <PageLayout current={current} grayBg>
      <div className='flex p-6 gap-x-6'>
        <div className='w-1/2'>
          <CostHistory />
        </div>
        <div className='w-1/2'>
          <PaymentHistory />
        </div>
      </div>
    </PageLayout>
  );
};

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  const current = query.current;
  return {
    props: {
      current,
    },
  };
};

export default History;
