import { GroupUsers } from '@/types/type';
import { Avatar, Card } from '@mui/material';
import { memo } from 'react';

interface Props {
  groupUsers: GroupUsers;
}

const MemberCard = memo((props: Props) => {
  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5  flex flex-col items-center justify-center gap-y-5 overflow-scroll'>
        <span className='font-bold text-xl text-gray-600'>メンバー</span>
        <div className='w-full space-y-4'>
          {props.groupUsers.map((user) => (
            <div
              className='flex items-center justify-between border-b p-1'
              key={user.id}
            >
              <div className='flex items-center gap-x-2'>
                <Avatar src={user?.photoUrl} sx={{ width: 30, height: 30 }} />
                <span>{user.name}</span>
              </div>
              <span className='text-sm'>
                役割：
                <span className='font-bold text-base'>{user.position}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
});

export default MemberCard;
