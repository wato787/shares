import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';
import { Button, TextField } from '@mui/material';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setGroupId } from '@/slice/groupIdSlice';
import InputCard from '@/components/organisms/card/InputCard';
import { useSnackbar } from '@/hooks/useSnackBar';
import TotalCard from '@/components/organisms/card/TotalCard';
import IndividualCard from '@/components/organisms/card/IndividualCard';
import ExpensesCard from '@/components/organisms/card/ExpensesCard';
import { useAuthContext } from '@/feature/auth/AuthProvider';
import MonthBadge from '@/components/atoms/MonthBadge';
import useDate from '@/hooks/useDate';
import { setThisMonthData } from '@/slice/thisMonthDataSlice';
import LoadingScreen from '@/components/templates/LoadingScreen';

export default function Home({ current }: Current) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [joinPositon, setJoinPosition] = useState('');
  const { userId } = useSelector((state: RootState) => state.userId);
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const { groupData } = useSelector((state: RootState) => state.groupData);
  const groupUsers = useSelector((state: RootState) => state.groupUsers);
  const { thisMonthData } = useSelector(
    (state: RootState) => state.thisMonthData
  );
  const { monthColor, monthName } = useDate();

  const [joinId, setJoinId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  // グループ加入
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

  // 今月のデータ取得
  const getThisMonthData = useCallback(async (): Promise<void> => {
    if (!groupId) return;

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const groupDocRef = collection(db, 'group', groupId, 'cost');
    const groupQuery = query(
      groupDocRef,
      where('createdAt', '>=', firstDayOfMonth),
      where('createdAt', '<=', lastDayOfMonth),
      orderBy('createdAt', 'asc')
    );

    const querySnapshot = await getDocs(groupQuery);
    const data = querySnapshot.docs.map((doc) => {
      const firestoreTimestamp = doc.data().createdAt;
      const isoTimestamp = firestoreTimestamp.toDate().toISOString();
      return {
        ...doc.data(),
        createdAt: isoTimestamp,
      };
    });
    dispatch(setThisMonthData(data));
  }, [groupId]);

  useEffect(() => {
    if (thisMonthData.length > 0) return;
    setIsLoading(true);
    (async (): Promise<void> => {
      await getThisMonthData();
    })();
    setIsLoading(false);
  }, [getThisMonthData]);

  return (
    <PageLayout current={current} grayBg>
      <>
        {isLoading && <LoadingScreen />}
        {groupId ? (
          <div className='p-6 w-full flex flex-col gap-y-10 h-full'>
            <div className=' -mt-2 -mb-6 mx-auto'>
              <MonthBadge monthColor={monthColor} monthName={monthName} />
            </div>
            <ExpensesCard groupData={groupData} />

            <div className='flex gap-x-10 flex-1'>
              <div className='w-1/3'>
                <InputCard groupId={groupId} user={user} />
              </div>
              <div className='w-1/3'>
                <TotalCard groupData={groupData} />
              </div>
              <div className='w-1/3'>
                <IndividualCard groupUsers={groupUsers} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className='p-5 flex  items-center justify-center gap-y-5 w-full'>
              <div className='flex flex-col w-full p-5'>
                <span className=' text-center'>グループIDに参加する</span>
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
              </div>

              <div className='flex flex-col w-full p-5'>
                <span className='text-center'>グループを作成する</span>
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
              </div>
            </div>
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
