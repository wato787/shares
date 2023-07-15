import { useAuthContext } from '@/feature/auth/AuthProvider';
import { RootState } from '@/store';
import {
  Avatar,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase';

const InputCard = () => {
  const { user } = useAuthContext();
  const [selectCostType, setSelectCostType] = useState('');
  const [amount, setAmount] = useState('');
  const { groupId } = useSelector((state: RootState) => state.groupId);

  const addCost = async (e: any) => {
    e.preventDefault();
    if (!groupId) return;
    const groupRef = collection(db, 'group', groupId, 'cost');
    await addDoc(groupRef, {
      costType: selectCostType,
      cost: parseInt(amount),
      date: new Date(),
      inputUserId: user?.uid,
      inputUserName: user?.displayName,
      inputUserPhotoUrl: user?.photoURL,
    });
    setAmount('');
  };

  return (
    <div className='w-1/3 '>
      <Card>
        <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
          <span className='font-bold text-xl text-gray-600'>出費入力</span>
          <div className='flex items-center gap-x-2'>
            <span>入力者：</span>
            <Avatar
              sx={{ width: 30, height: 30 }}
              aria-label='recipe'
              src={user?.photoURL as string}
            />

            <span>{user?.displayName}</span>
          </div>
          <div className='flex flex-col  w-full'>
            <span className='text-gray-500 font-bold text-xs mb-2'>
              出費項目
            </span>
            <div className='space-y-8'>
              <Select
                fullWidth
                onChange={(e) => setSelectCostType(e.target.value as string)}
              >
                <MenuItem value='家賃'>家賃</MenuItem>
                <MenuItem value='雑費'>雑費</MenuItem>
                <MenuItem value='水道代'>水道代</MenuItem>
                <MenuItem value='光熱費'>光熱費</MenuItem>
                <MenuItem value='ガス代'>ガス代</MenuItem>
                <MenuItem value='食費'>食費</MenuItem>
              </Select>
              <form
                onSubmit={addCost}
                className='flex flex-col  w-full space-y-7'
              >
                <TextField
                  type='number'
                  id='input-with-sx'
                  label='金額'
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value as string)}
                  onSubmit={addCost}
                />
                <Button
                  variant='outlined'
                  fullWidth
                  sx={{ height: 50 }}
                  color='primary'
                  onClick={addCost}
                >
                  送信
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InputCard;
