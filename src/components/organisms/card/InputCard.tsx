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
import { useMemo, useState } from 'react';
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

  const options = useMemo(
    () => [
      { value: '雑費', label: '雑費' },
      { value: '水道代', label: '水道代' },
      { value: '光熱費', label: '光熱費' },
      { value: 'ガス代', label: 'ガス代' },
      { value: '食費', label: '食費' },
    ],
    []
  );

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
                defaultValue=''
              >
                {/* 家賃別のとこに移動 */}
                {/* <MenuItem value='家賃'>家賃</MenuItem> */}
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
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
                  variant='contained'
                  fullWidth
                  sx={{ height: 50 }}
                  onClick={addCost}
                  disabled={!selectCostType || !amount}
                  className='bg-primary hover:opacity-[0.99] text-white font-bold py-2 px-4 rounded'
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
