import {
  Avatar,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { FormEvent, MouseEvent, memo, useState } from 'react';
import { db } from '../../../../firebase';
import { User } from 'firebase/auth';
import { useSnackbar } from '@/hooks/useSnackBar';
import { CostType } from '@/utils/CostType';

interface Props {
  groupId: string;
  user: User | null | undefined;
}

const options = [
  { value: '雑費' },
  { value: '水道代' },
  { value: '光熱費' },
  { value: 'ガス代' },
  { value: '食費' },
  { value: '通信費' },
  { value: 'その他' },
];

const selectCostTypeChange = (type: string): CostType => {
  if (type === '雑費') return CostType.MISCELLANEOUS;
  if (type === '水道代') return CostType.WATER;
  if (type === '光熱費') return CostType.UTILITIES;
  if (type === 'ガス代') return CostType.GAS;
  if (type === '食費') return CostType.FOOD;
  if (type === '通信費') return CostType.COMMUNICATION;
  if (type === 'その他') return CostType.OTHER;
  return CostType.OTHER;
};

const InputCard = memo((props: Props) => {
  const [selectCostType, setSelectCostType] = useState('');
  const [amount, setAmount] = useState('');
  const { showSnackbar } = useSnackbar();

  const addCost = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!props.groupId) return;
    const groupRef = collection(db, 'group', props.groupId, 'cost');
    await addDoc(groupRef, {
      costType: selectCostTypeChange(selectCostType),
      amount: parseInt(amount),
      createdAt: new Date(),
      createdUserId: props.user?.uid,
      createdUserName: props.user?.displayName,
      createdUserPhotoURL: props.user?.photoURL,
    });
    showSnackbar('出費を追加しました', 'success');
    setAmount('');
  };

  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
        <span className='font-bold text-xl text-gray-600'>出費入力</span>
        <div className='flex items-center gap-x-2'>
          <span>入力者：</span>
          <Avatar
            sx={{ width: 30, height: 30 }}
            aria-label='recipe'
            src={props.user?.photoURL as string}
          />

          <span>{props.user?.displayName}</span>
        </div>
        <div className='flex flex-col  w-full'>
          <span className='text-gray-500 font-bold text-xs mb-2'>出費項目</span>
          <div className='space-y-8'>
            <Select
              fullWidth
              onChange={(e) => setSelectCostType(e.target.value as string)}
              defaultValue=''
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
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
  );
});

export default InputCard;
