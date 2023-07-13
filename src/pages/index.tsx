import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';
import { Button, TextField } from '@mui/material';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { setGroupId } from '@/slice/groupIdSlice';
import { useSnackbar } from '@/hooks/useSnackBar';

export default function Home({ current }: Current) {
  const [name, setName] = useState('');
  const { userId } = useSelector((state: RootState) => state.userId);
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const open = useSelector((state: RootState) => state.drawer.open);

  // グループ作成
  const handleCreateGroup = async (): Promise<void> => {
    const newDocRef = await addDoc(collection(db, 'group'), {
      name: name,
    });
    const docId = newDocRef.id;
    await setDoc(doc(db, 'group', docId), { id: docId }, { merge: true });

    if (!userId) return;

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

  return (
    <PageLayout current={current}>
      <>
        {groupId ? (
          <>
            <p>グループ加入済み</p>
            <p>userId:{userId}</p>
            <p>groupId:{groupId}</p>
          </>
        ) : (
          <>
            {/* 招待IDを入れるtextfield */}
            {/* <Button>加入</Button> */}
            <TextField value={name} onChange={(e) => setName(e.target.value)} />
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
