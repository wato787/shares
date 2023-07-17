import { useAuthContext } from '@/feature/auth/AuthProvider';
import { Avatar, Card } from '@mui/material';

const MemberCard = () => {
  const { user } = useAuthContext();
  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5  flex flex-col items-center justify-center gap-y-5'>
        <span className='font-bold text-xl text-gray-600'>メンバー</span>
        <div className='w-full space-y-4'>
          <div className='flex items-center justify-between border-b p-1'>
            <div className='flex items-center gap-x-2'>
              <Avatar
                src={user?.photoURL as string}
                sx={{ width: 30, height: 30 }}
              />
              <span>{user?.displayName}</span>
            </div>
            <span className='text-base'>役職：大黒柱</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <div className='flex items-center gap-x-2'>
              <Avatar
                src={user?.photoURL as string}
                sx={{ width: 30, height: 30 }}
              />
              <span>{user?.displayName}</span>
            </div>
            <span className='text-base'>役職：大黒柱</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MemberCard;
