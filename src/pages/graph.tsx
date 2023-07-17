import Chart from '@/components/organisms/Chart';
import GroupJoinCard from '@/components/organisms/card/GroupJoinCard';
import GroupCreateCard from '@/components/organisms/card/GroupcreateCard';
import PageLayout from '@/components/templates/PageLayout';
import { RootState } from '@/store';
import { Current, CurrentPageType } from '@/types/type';

import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

const graph = ({ current }: Current): ReactElement => {
  const { groupId } = useSelector((state: RootState) => state.groupId);
  return (
    <>
        <PageLayout current={current} grayBg>
      {groupId ? (
          <Chart />
          ) : (
            <>
          <div className='p-5 '>
        <div className='flex  w-full gap-x-5'>
          <div className='w-1/2 '>
            <GroupCreateCard />
          </div>
          <div className='w-1/2'>
            <GroupJoinCard />
          </div>
        </div>
      </div>
        </>
      )}
      </PageLayout>
    </>
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

export default graph;
