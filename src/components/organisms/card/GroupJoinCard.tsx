import { useAuthContext } from '@/feature/auth/AuthProvider';
import { RootState } from '@/store';
import { Button, Card, TextField } from '@mui/material';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../firebase';
import { setGroupId } from '@/slice/groupIdSlice';
import { useSnackbar } from '@/hooks/useSnackBar';

const GroupCreateCard = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [joinPositon, setJoinPosition] = useState('');
  const { userId } = useSelector((state: RootState) => state.userId);
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const [joinId, setJoinId] = useState('');
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const open = useSelector((state: RootState) => state.drawer.open);
  const { user } = useAuthContext();

  // 	TODO: グループ加入 ユーザーにgroupId格納
  const handleJoinGroup = async (): Promise<void> => {
    if (!userId) {
      showSnackbar('ログインしてください', 'error');
      return;
    }

    const groupRef = doc(db, 'group', joinId);
    const groupSnapshot = await getDoc(groupRef);

    if (!groupSnapshot.exists()) {
      showSnackbar('指定されたグループIDは存在しません', 'error');
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    await setDoc(
      userDocRef,
      {
        groupId: joinId,
      },
      { merge: true }
    );
    await addDoc(collection(db, 'group', joinId, 'users'), {
      id: userId,
      photoUrl: user?.photoURL,
      name: user?.displayName,
      position: joinPositon,
    });

    dispatch(setGroupId(joinId));
    showSnackbar('グループに加入しました', 'success');
  };

  return (
    <Card>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5 '>
        <span className='font-bold text-xl text-gray-600'>
          グループに参加する
        </span>
        <div className='flex items-center gap-x-2'></div>
        <div className='flex flex-col  w-full gap-x-2'>
          <div className='space-y-8'>
            <TextField
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              label='グループID'
              fullWidth
              />
            <div className='flex flex-col  w-full space-y-7'>
          
              <TextField
                value={joinPositon}
                onChange={(e) => setJoinPosition(e.target.value)}
                label='役割'
                />

              <Button
                variant='contained'
                fullWidth
                sx={{ height: 50 }}
                onClick={handleJoinGroup}
                disabled={!joinId || !joinPositon}
                className='bg-primary hover:opacity-[0.99] text-white font-bold py-2 px-4 rounded'
                >
                送信
              </Button>

                </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GroupCreateCard;
