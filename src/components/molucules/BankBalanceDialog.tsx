import { useAuthContext } from '@/feature/auth/AuthProvider';
import { Dialog, TextField, Button, Avatar } from '@mui/material';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, {
  FormEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import { db } from '../../../firebase';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupData } from '@/slice/groupDataSlice';
import { useSnackbar } from '@/hooks/useSnackBar';

interface Props {
  open: boolean;
  onClose: () => void;
}

const BankBalanceDialog = (props: Props): ReactElement => {
  const { user } = useAuthContext();
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const { userId } = useSelector((state: RootState) => state.userId);
  const [amount, setAmount] = useState<string>('');
  const { groupData } = useSelector((state: RootState) => state.groupData);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  // groupに残高を追加(現在の残高用)
  const handleAddGroupBankBalance = useCallback(async (): Promise<void> => {
    if (!groupId || !amount) return;
    const groupRef = doc(db, 'group', groupId);
    const groupBankBalance: number = await getDoc(groupRef).then((doc) => {
      return doc.data()?.bankBalance;
    });

    const newBankBalance = (): number => {
      if (!groupBankBalance) {
        return parseInt(amount);
      } else {
        return groupBankBalance + parseInt(amount);
      }
    };

    await setDoc(groupRef, { bankBalance: newBankBalance() }, { merge: true });
    dispatch(setGroupData({ ...groupData, bankBalance: newBankBalance() }));
  }, [amount, dispatch, groupId, groupData, showSnackbar]);

  // group-paymentに残高を追加(履歴追跡用)
  const handleAddGroupPayment = async (): Promise<void> => {
    if (!groupId || !amount) return;
    const groupPaymentRef = collection(db, 'group', groupId, 'payment');
    const newPaymentDoc = await addDoc(groupPaymentRef, {
      amount: parseInt(amount),
      createdAt: new Date(),
      createdBy: userId,
    });
    await setDoc(newPaymentDoc, { id: newPaymentDoc.id }, { merge: true });
  };

  // 残高追加クリック時の処理
  const handleAddBankBalance = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await handleAddGroupBankBalance();
      await handleAddGroupPayment();
      showSnackbar('残高を追加しました', 'success');
    } catch (e) {
      showSnackbar('残高の追加に失敗しました', 'error');
    }
    setAmount('');
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <div className='p-5 w-[400px] space-y-5'>
        <h3 className='text-xl font-bold text-center'>残高追加</h3>
        <div className='flex items-center justify-center gap-x-2'>
          <span>入力者：</span>
          <Avatar
            sx={{ width: 30, height: 30 }}
            aria-label='recipe'
            src={user?.photoURL as string}
          />

          <span>{user?.displayName}</span>
        </div>
        <form
          onSubmit={handleAddBankBalance}
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
            onClick={handleAddBankBalance}
            disabled={!amount}
            className='bg-primary hover:opacity-[0.99] text-white font-bold py-2 px-4 rounded'
          >
            追加
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default BankBalanceDialog;
