import { Button, Card, TextField } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { FormEvent, MouseEvent, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../../../firebase';
import { useSnackbar } from '@/hooks/useSnackBar';
import { setGroupData } from '@/slice/groupDataSlice';
import { GroupData } from '@/types/type';

interface Props {
  groupData: GroupData;
  groupId: string;
}

const RentCard = memo((props: Props) => {
  const [rentCost, setRentCost] = useState('');

  const [isChangeMode, setIsChangeMode] = useState(false);
  const { showSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const changeRentCost = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!props.groupId) return;
    const groupRef = doc(db, 'group', props.groupId);
    await setDoc(
      groupRef,
      {
        rentCost: parseInt(rentCost),
      },
      { merge: true }
    );
    dispatch(
      setGroupData({ ...props.groupData, rentCost: parseInt(rentCost) })
    );
    setIsChangeMode(false);
    showSnackbar('家賃を変更しました', 'success');
    setRentCost('');
  };

  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
        <span className='font-bold text-xl text-gray-600'>家賃設定</span>
        {!isChangeMode ? (
          <div className='flex flex-col  w-full gap-y-5'>
            <div className='flex items-center justify-between  bg-secondary rounded p-4'>
              <span className='text-gray-500 font-bold text-base '>
                現在の設定家賃
              </span>
              <span className='text-gray-500 font-bold text-base'>
                {props.groupData?.rentCost?.toLocaleString()}
                <span className='ml-1 text-sm'>円</span>
              </span>
            </div>
            <Button onClick={() => setIsChangeMode(true)}>変更する</Button>
          </div>
        ) : (
          <div className='w-full'>
            <form
              onSubmit={changeRentCost}
              className='flex flex-col  w-full space-y-7'
            >
              <TextField
                type='number'
                id='input-with-sx'
                label='金額'
                fullWidth
                value={rentCost}
                onChange={(e) => setRentCost(e.target.value as string)}
              />
              <Button
                variant='contained'
                fullWidth
                onClick={changeRentCost}
                disabled={!rentCost}
                className='bg-primary hover:opacity-[0.99] text-white font-bold py-2 px-4 rounded'
              >
                変更
              </Button>
            </form>
          </div>
        )}
      </div>
    </Card>
  );
});

export default RentCard;
