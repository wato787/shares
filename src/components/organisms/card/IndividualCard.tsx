import { GroupUser } from '@/types/type';
import { Avatar, Card } from '@mui/material';
import { memo, useMemo } from 'react';

interface Props {
  groupUsers: GroupUser[];
}

const IndividualCard = memo((props: Props) => {
  const totalCost = 100000;

  const individualCost = useMemo((): string => {
    const divisionCost = totalCost / props.groupUsers.length;
    return divisionCost.toLocaleString();
  }, [props.groupUsers.length, totalCost]);

  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5'>
        <span className='font-bold text-xl text-gray-600'>1人あたりの出費</span>
        <div className='w-full space-y-4'>
          {props.groupUsers.map((user) => (
            <div
              className='flex items-center justify-between border-b p-1'
              key={user.id}
            >
              <div className='flex items-center gap-x-2'>
                <Avatar
                  src={user.photoUrl as string}
                  sx={{ width: 30, height: 30 }}
                />
                <span>{user.name}</span>
              </div>
              <span className='text-base'>{individualCost}円</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
});

export default IndividualCard;
