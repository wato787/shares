import Chart from '@/components/organisms/Chart';
import PageLayout from '@/components/templates/PageLayout';
import { setAllCostData } from '@/slice/costDataSlice';
import { CostData, Current, CurrentPageType } from '@/types/type';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import React, { ReactElement, useCallback, useEffect } from 'react';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

const graph = ({ current }: Current): ReactElement => {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const AllCostData = useSelector(
    (state: RootState) => state.costData.allCostData
  );

  const getAllData = useCallback(async (): Promise<void> => {
    if (!groupId) return;

    const groupDocRef = collection(db, 'group', groupId, 'cost');
    const groupQuery = query(groupDocRef, orderBy('createdAt', 'asc'));

    const querySnapshot = await getDocs(groupQuery);
    const data: CostData[] = querySnapshot.docs.map((doc) => {
      const firestoreTimestamp = doc.data().createdAt;
      const isoTimestamp = firestoreTimestamp.toDate().toISOString();
      return {
        ...doc.data(),
        createdAt: isoTimestamp,
      } as CostData;
    });
    dispatch(setAllCostData(data));
  }, [groupId]);

  useEffect(() => {
    if (AllCostData.length > 0) return;
    setIsLoading(true);
    (async (): Promise<void> => {
      await getAllData();
      setIsLoading(false);
    })();
  }, [getAllData]);

  return (
    <>
      <PageLayout current={current}>
        {AllCostData.length === 0 ? (
          <Chart CostData={AllCostData} />
        ) : (
          <div>データがありません</div>
        )}
      </PageLayout>
    </>
  );
};

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  const current = query.current;
  return {
    props: {
      current,
    },
  };
};

export default graph;
