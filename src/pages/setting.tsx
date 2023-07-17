import InviteCard from '@/components/organisms/card/InviteCard';
import RentCard from '@/components/organisms/card/RentCard';
import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';

import React, { ReactElement } from 'react';

const Setting = ({ current }: Current): ReactElement => {
  return (
    <PageLayout current={current} grayBg>
      <div className='flex flex-col w-full p-5 gap-y-8'>
        <div className='flex  w-full gap-x-10'>
          <div className='w-1/3 '>
            <RentCard />
          </div>
          <div className='w-1/3'>
            <InviteCard />
          </div>
          <div className='w-1/3'>
            <InviteCard />
          </div>
        </div>
        <div className='flex  w-full gap-x-10'>
          <div className='w-1/3 '>
            <RentCard />
          </div>
          <div className='w-1/3'>
            <InviteCard />
          </div>
          <div className='w-1/3'>
            <InviteCard />
          </div>
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

export default Setting;
