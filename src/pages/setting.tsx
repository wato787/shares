import InputCard from '@/components/organisms/card/InputCard';
import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';

import React, { ReactElement } from 'react';

const Setting = ({ current }: Current): ReactElement => {
  return (
    <PageLayout current={current} grayBg>
      <div className='flex flex-col w-full p-5'>
        <div className='flex  w-full gap-x-5'>
          <div className='w-1/2'>
            <InputCard />
          </div>
          <div className='w-1/2'>
            <InputCard />
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
