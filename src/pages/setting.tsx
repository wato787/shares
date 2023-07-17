import GroupJoinCard from '@/components/organisms/card/GroupJoinCard';
import GroupCreateCard from '@/components/organisms/card/GroupcreateCard';
import InputCard from '@/components/organisms/card/InputCard';
import PageLayout from '@/components/templates/PageLayout';
import { RootState } from '@/store';
import { Current, CurrentPageType } from '@/types/type';

import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

const Setting = ({ current }: Current): ReactElement => {
  const { groupId } = useSelector((state: RootState) => state.groupId);
  return (
    <>
      <PageLayout current={current} grayBg>
        {groupId ? (
          <>
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
          </>
        ) : (
          <>
            <div className=' p-5'>
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

export default Setting;
