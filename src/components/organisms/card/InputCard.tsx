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
import { CostData } from '@/types/type';

interface Props {
  groupId: string;
  user: User | null | undefined;
}

const options = [
  { label: '雑費', value: CostType.MISCELLANEOUS },
  { label: '水道代', value: CostType.WATER },
  { label: '光熱費', value: CostType.UTILITIES },
  { label: 'ガス代', value: CostType.GAS },
  { label: '食費', value: CostType.FOOD },
  { label: '通信費', value: CostType.COMMUNICATION },
  { label: 'その他', value: CostType.OTHER },
];

const InputCard = memo((props: Props) => {
  const [selectCostType, setSelectCostType] = useState<string>('');
  const [amount, setAmount] = useState('');
  const { showSnackbar } = useSnackbar();

  const addCost = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!props.groupId) return;
    const groupRef = collection(db, 'group', props.groupId, 'cost');
    await addDoc(groupRef, {
      costType: selectCostType,
      amount: parseInt(amount),
      createdAt: new Date(),
      createdUserId: props.user?.uid,
      createdUserName: props.user?.displayName,
      createdUserPhotoURL: props.user?.photoURL,
    } as CostData);
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
