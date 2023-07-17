import { useAuthContext } from '@/feature/auth/AuthProvider';
import { Avatar, Card } from '@mui/material';

const IndividualCard = () => {
  const { user } = useAuthContext();
  return (
    <Card>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5'>
        <span className='font-bold text-xl text-gray-600'>1人あたりの出費</span>
        <div className='w-full space-y-4'>
          <div className='flex items-center justify-between border-b p-1'>
            <div className='flex items-center gap-x-2'>
              <Avatar
                src={user?.photoURL as string}
                sx={{ width: 30, height: 30 }}
              />
              <span>{user?.displayName}</span>
            </div>
            <span className='text-base'>100000円</span>
          </div>
          <div className='flex items-center justify-between border-b p-1'>
            <div className='flex items-center gap-x-2'>
              <Avatar
                src={user?.photoURL as string}
                sx={{ width: 30, height: 30 }}
              />
              <span>{user?.displayName}</span>
            </div>
            <span className='text-base'>100000円</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IndividualCard;
