import { RootState } from '@/store';
import { Avatar, Card } from '@mui/material';
import { useSelector } from 'react-redux';

const ProfileCard = () => {
  const groupUsers = useSelector((state: RootState) => state.groupUsers);

  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5  flex flex-col items-center justify-center gap-y-5 overflow-scroll'>
        <span className='font-bold text-xl text-gray-600'>プロフィール</span>
        <div className='w-full space-y-4'>
          <Avatar></Avatar>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
