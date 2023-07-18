import { Avatar, Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { User } from 'firebase/auth';
import { memo } from 'react';

interface Props {
  user: User | null | undefined;
}

const ProfileCard = memo((props: Props) => {
  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5  flex flex-col items-center justify-center gap-y-5 overflow-scroll'>
        <div className='relative w-full flex justify-center'>
          <span className='font-bold text-xl text-gray-600 '>プロフィール</span>
          <div className='absolute -top-1 right-0'>
            <Button startIcon={<EditIcon />}>編集</Button>
          </div>
        </div>
        <div className='w-full space-y-4 flex flex-col items-center'>
          <Avatar
            src={props.user?.photoURL as string}
            sx={{ width: 60, height: 60 }}
          />
          <div className='flex items-center'>
            <span>名前：</span>
            <span className='font-bold text-base'>
              {props.user?.displayName}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default ProfileCard;
