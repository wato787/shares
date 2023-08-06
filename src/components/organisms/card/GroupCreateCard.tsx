import { useAuthContext } from '@/feature/AuthProvider';
import { RootState } from '@/store';
import { Button, Card, TextField } from '@mui/material';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../firebase';
import { setGroupId } from '@/slice/groupIdSlice';
import { useSnackbar } from '@/hooks/useSnackBar';

const GroupCreateCard = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const { userId } = useSelector((state: RootState) => state.userId);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  // グループ作成
  const handleCreateGroup = async (): Promise<void> => {
    if (!userId) {
      showSnackbar('ログインしてください', 'error');
      return;
    }
    const newDocRef = await addDoc(collection(db, 'group'), {
      name: name,
    });
    const docId = newDocRef.id;
    await setDoc(doc(db, 'group', docId), { id: docId }, { merge: true });
    await addDoc(collection(db, 'group', docId, 'users'), {
      id: userId,
      photoUrl: user?.photoURL,
      name: user?.displayName,
      position: position,
    });

    await setDoc(
      doc(db, 'users', userId),
      {
        groupId: docId,
      },
      { merge: true }
    );
    dispatch(setGroupId(docId));
    showSnackbar('グループを作成しました', 'success');
  };

  return (
    <Card>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
        <span className='font-bold text-xl text-gray-600'>
          グループ新規作成
        </span>
        <div className='flex items-center gap-x-2'></div>
        <div className='flex flex-col  w-full'>
          <div className='space-y-8'>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              label='グループ名'
            />
            <div className='flex flex-col  w-full space-y-7'>
              <TextField
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                label='役割'
              />
              <Button
                variant='contained'
                fullWidth
                sx={{ height: 50 }}
                onClick={handleCreateGroup}
                disabled={!name || !position}
                className='bg-primary hover:opacity-[0.99] text-white font-bold py-2 px-4 rounded'
              >
                作成
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GroupCreateCard;
