import TotalCard from '@/components/organisms/card/TotalCard';
import PageLayout from '@/components/templates/PageLayout';
import { setThisMonthData } from '@/slice/costDataSlice';
import { RootState } from '@/store';
import { CostData, CurrentPageType } from '@/types/type';
import { CostType } from '@/utils/CostType';
import { collection, where, orderBy, getDocs, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { db } from '../../../firebase';
import { Color } from '@/utils/Color';
import LoadingScreen from '@/components/templates/LoadingScreen';

interface Query {
  queryPath: {
    current: string;
    year: number;
    month: number;
  };
}

interface CalcCost {
  type: CostType;
  totalCost: number;
}

const index = ({ queryPath }: Query) => {
  const { groupData } = useSelector((state: RootState) => state.groupData);
  const { thisMonthData } = useSelector((state: RootState) => state.costData);
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  // 今月のデータ取得
  const getThisMonthData = useCallback(async (): Promise<void> => {
    if (!groupId) return;
    const month = queryPath.month;
    const year = queryPath.year;
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
    (async (): Promise<void> => {
      await getThisMonthData();
    })();
    setIsLoading(false);
  }, [getThisMonthData]);

  const calcedCost = useMemo((): CalcCost[] => {
    const calcCost: CalcCost[] = [
      { type: CostType.RENT, totalCost: groupData.rentCost as number },
      { type: CostType.MISCELLANEOUS, totalCost: 0 },
      { type: CostType.WATER, totalCost: 0 },
      { type: CostType.UTILITIES, totalCost: 0 },
      { type: CostType.GAS, totalCost: 0 },
      { type: CostType.FOOD, totalCost: 0 },
      { type: CostType.COMMUNICATION, totalCost: 0 },
      { type: CostType.OTHER, totalCost: 0 },
    ];

    thisMonthData.forEach((data) => {
      switch (data.costType) {
        case CostType.MISCELLANEOUS:
          calcCost[1].totalCost += data.amount;
          break;
        case CostType.WATER:
          calcCost[2].totalCost += data.amount;
          break;
        case CostType.UTILITIES:
          calcCost[3].totalCost += data.amount;
          break;
        case CostType.GAS:
          calcCost[4].totalCost += data.amount;
          break;
        case CostType.FOOD:
          calcCost[5].totalCost += data.amount;
          break;
        case CostType.COMMUNICATION:
          calcCost[6].totalCost += data.amount;
          break;
        case CostType.OTHER:
          calcCost[7].totalCost += data.amount;
          break;
        default:
          break;
      }
    });
    return calcCost;
  }, [thisMonthData]);

  const COLORS = [
    Color.RENT,
    Color.MISCELLANEOUS,
    Color.WATER,
    Color.GAS,
    Color.UTILITIES,
    Color.FOOD,
    Color.COMMUNICATION,
    Color.OTHER,
  ];

  return (
    <>
      {calcedCost.length !== 0 ? (
        <PageLayout>
          <div className=''>データがありません</div>
        </PageLayout>
      ) : (
        <>
          {!isLoading ? (
            <PageLayout current={queryPath.current}>
              <>
                <div className='text-gray-500 text-2xl font-bold flex justify-center'>
                  <span>{queryPath.year + '年' + queryPath.month + '月'}</span>
                </div>
                <div className='flex  h-full'>
                  <div className='w-1/2'>
                    <ResponsiveContainer width='100%' height={650}>
                      <PieChart>
                        <Pie
                          data={calcedCost}
                          dataKey='totalCost'
                          fill='#8884d8'
                          outerRadius={200}
                          label={(entry) => `¥${entry.value.toLocaleString()}`}
                        >
                          {calcedCost.map((_entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className='w-1/2  h-full flex justify-center items-center'>
                    <div className='w-[80%]'>
                      <TotalCard
                        groupData={groupData}
                        thisMonthData={thisMonthData}
                      />
                    </div>
                  </div>
                </div>
              </>
            </PageLayout>
          ) : (
            <LoadingScreen />
          )}
        </>
      )}
    </>
  );
};

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  const queryPath = query;
  return {
    props: {
      queryPath,
    },
  };
};

export default index;
