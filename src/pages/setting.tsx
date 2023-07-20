import InviteCard from '@/components/organisms/card/InviteCard';
import RentCard from '@/components/organisms/card/RentCard';
import MemberCard from '@/components/organisms/card/MemberCard';

import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';

import React, { ReactElement } from 'react';
import ProfileCard from '@/components/organisms/card/ProfileCard';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useAuthContext } from '@/feature/auth/AuthProvider';

const Setting = ({ current }: Current): ReactElement => {
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const { groupData } = useSelector((state: RootState) => state.groupData);
  const { user } = useAuthContext();
  const groupUsers = useSelector((state: RootState) => state.groupUsers);
  return (
    <PageLayout current={current} grayBg>
      <div className='flex flex-col w-full p-6 gap-y-8 h-full'>
        <div className='flex  w-full gap-x-10 flex-1'>
          <div className='w-1/3'>
            <RentCard groupData={groupData} groupId={groupId as string} />
          </div>
          <div className='w-1/3'>
            <InviteCard groupId={groupId as string} />
          </div>
          <div className='w-1/3'>
            <ProfileCard user={user} />
          </div>
        </div>
        <div className='flex  w-full gap-x-10 h-full'>
          <div className='w-1/3'>
            <MemberCard groupUsers={groupUsers} />
          </div>
          <div className='w-1/3'>
            <MemberCard groupUsers={groupUsers} />
          </div>
          <div className='w-1/3'>
            <MemberCard groupUsers={groupUsers} />
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
