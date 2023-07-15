import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';
import { Button, TextField } from '@mui/material';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
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

export default function Home({ current }: Current) {
  const [name, setName] = useState('');
  const { userId } = useSelector((state: RootState) => state.userId);
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const open = useSelector((state: RootState) => state.drawer.open);

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

  // 再読み込み時にグループID取得
  const handleReload = async (): Promise<void> => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    dispatch(setGroupId(userDocSnap.data()?.groupId));
  };

  // 	TODO: グループ加入 ユーザーにgroupId格納

  return (
    <PageLayout current={current}>
      <>
        {groupId ? (
          <div
            className={classNames(
              ' bg-secondary p-5 w-full flex flex-col gap-y-10 '
            )}
          >
            <div className='w-full' >
            <ExpensesCard/>
            </div>
            
            
            <div className='flex w-full gap-x-10'>
              <InputCard />
              <TotalCard />
              <IndividualCard />
            </div>
          </div>
        ) : (
          <>
            {/* 招待IDを入れるtextfield */}
            {/* <Button>加入</Button> */}
            <TextField value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={handleCreateGroup}>作成</Button>
            <Button onClick={handleReload}>再読み込み</Button>
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
