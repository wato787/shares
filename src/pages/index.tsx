import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';
import { Button, TextField } from '@mui/material';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setGroupId } from '@/slice/groupIdSlice';
import InputCard from '@/components/organisms/card/InputCard';
import { useSnackbar } from '@/hooks/useSnackBar';
import classNames from 'classnames';
import TotalCard from '@/components/organisms/card/TotalCard';
import IndividualCard from '@/components/organisms/card/IndividualCard';
import ExpensesCard from '@/components/organisms/card/ExpensesCard';
import { useAuthContext } from '@/feature/auth/AuthProvider';

export default function Home({ current }: Current) {
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

  // 	TODO: グループ加入 ユーザーにgroupId格納
  const handleJoinGroup = async (): Promise<void> => {
    if (!userId) {
      showSnackbar('ログインしてください', 'error');
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
    <PageLayout current={current} grayBg>
      <>
        {/* TODO:データ取得のローディングで分岐する */}
        {!groupId ? (
          <div className={classNames('p-5 w-full flex flex-col gap-y-10')}>
            <ExpensesCard />

            <div className='flex w-full gap-x-10'>
              <InputCard />
              <TotalCard />
              <IndividualCard />
            </div>
          </div>
        ) : (
          <>
            <TextField
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              label='グループID'
            />
            <TextField
              value={joinPositon}
              onChange={(e) => setJoinPosition(e.target.value)}
              label='役割'
            />

            <Button onClick={handleJoinGroup}>加入</Button>

            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label='id'
            />

            <TextField
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              label='役割'
            />
            <Button onClick={handleCreateGroup}>作成</Button>
            {/* <p>{groupId}</p> */}
          </>
        )}
      </>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  if (!query.current) {
    return {
      props: {
        current: null,
      },
    };
  }
  const current = query.current;
  return {
    props: {
      current,
    },
  };
};
