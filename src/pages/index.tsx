import PageLayout from '@/components/templates/PageLayout';
import { CostData, Current, CurrentPageType } from '@/types/type';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import InputCard from '@/components/organisms/card/InputCard';
import TotalCard from '@/components/organisms/card/TotalCard';
import IndividualCard from '@/components/organisms/card/IndividualCard';
import ExpensesCard from '@/components/organisms/card/ExpensesCard';

import MonthBadge from '@/components/atoms/MonthBadge';
import { setThisMonthData } from '@/slice/costDataSlice';
import LoadingScreen from '@/components/templates/LoadingScreen';
import { useAuthContext } from '@/feature/AuthProvider';

import useMonthColor from '@/hooks/useMonthColor';
import GroupCreateCard from '@/components/organisms/card/GroupCreateCard';
import GroupJoinCard from '@/components/organisms/card/GroupJoinCard';

export default function Home({ current }: Current) {
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const { groupData } = useSelector((state: RootState) => state.groupData);
  const groupUsers = useSelector((state: RootState) => state.groupUsers);
  const thisMonthData = useSelector(
    (state: RootState) => state.costData.thisMonthData
  );
  const { monthColor, monthName } = useMonthColor();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuthContext();

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
    const data: CostData[] = querySnapshot.docs.map((doc) => {
      const firestoreTimestamp = doc.data().createdAt;
      const isoTimestamp = firestoreTimestamp.toDate().toISOString();
      return {
        ...doc.data(),
        createdAt: isoTimestamp,
      } as CostData;
    });
    dispatch(setThisMonthData(data));
  }, [groupId]);

  useEffect(() => {
    if (thisMonthData.length > 0) return;
    setIsLoading(true);

    const fetchData = async () => {
      await getThisMonthData();

      setIsLoading(false);
    };

    fetchData();
  }, [getThisMonthData]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <PageLayout current={current} grayBg>
        <>
          {groupId ? (
            <div className='p-6 w-full flex flex-col gap-y-10 h-full'>
              <div className=' -mt-2 -mb-6 mx-auto'>
                <MonthBadge monthColor={monthColor} monthName={monthName} />
              </div>
              <ExpensesCard groupData={groupData} />

              <div className='grid grid-cols-3 gap-x-10'>
                <div>
                  <InputCard groupId={groupId} user={user} />
                </div>
                <div>
                  <TotalCard
                    groupData={groupData}
                    thisMonthData={thisMonthData}
                  />
                </div>
                <div>
                  <IndividualCard groupUsers={groupUsers} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='p-5 h-full'>
                <div className='flex justify-center items-center  w-full gap-x-5 h-full'>
                  <div className='w-1/3 '>
                    <GroupCreateCard />
                  </div>
                  <div className='w-1/3'>
                    <GroupJoinCard />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </PageLayout>
    </>
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
