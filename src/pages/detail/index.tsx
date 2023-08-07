import TotalCard from '@/components/organisms/card/TotalCard';
import PageLayout from '@/components/templates/PageLayout';
import { RootState } from '@/store';
import { CostData, CurrentPageType } from '@/types/type';
import { CostType } from '@/utils/CostType';
import { collection, where, orderBy, getDocs, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { db } from '../../../firebase';
import { Color } from '@/utils/Color';
import LoadingScreen from '@/components/templates/LoadingScreen';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';

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

const Index = ({ queryPath }: Query) => {
  const { groupData } = useSelector((state: RootState) => state.groupData);
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const [isLoading, setIsLoading] = useState(false);
  const [monthData, setMonthData] = useState<CostData[]>([]);
  const router = useRouter();

  const handleMonthChange = (month: number) => {
    router.push({
      pathname: '/detail',
      query: { year: queryPath.year, month: month, current: 'detail' },
    });
  };

  const handleYearChange = (year: number) => {
    router.push({
      pathname: '/detail',
      query: { year: year, month: queryPath.month, current: 'detail' },
    });
  };

  // 月のデータ取得
  const getMonthData = useCallback(async (): Promise<void> => {
    if (!groupId) return;
    setMonthData([]);
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
    setMonthData(data);
  }, [groupId, queryPath.month, queryPath.year]);

  useEffect(() => {
    setIsLoading(true);
    (async (): Promise<void> => {
      await getMonthData();
      setIsLoading(false);
    })();
  }, [getMonthData]);

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

    monthData.forEach((data) => {
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
  }, [monthData]);

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
      {!groupData.rentCost ? (
        <PageLayout current={queryPath.current}>
          <div className=''>家賃設定がされていません</div>
        </PageLayout>
      ) : (
        <>
          {!isLoading ? (
            <PageLayout current={queryPath.current}>
              <>
                <div className='text-gray-500 text-2xl font-bold flex justify-center gap-x-2'>
                  <FormControl sx={{ width: 100 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>年</InputLabel>
                    <Select
                      // value={selectYear}
                      label='月'
                      sx={{ width: 100 }}
                      defaultValue={0}
                      onChange={(e): void =>
                        handleYearChange(e.target.value as number)
                      }
                    >
                      <MenuItem value={0}>{queryPath.year}</MenuItem>
                      <MenuItem value={1}>{1}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: 100 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>月</InputLabel>
                    <Select
                      // value={queryPath.month}
                      label='月'
                      sx={{ width: 100 }}
                      defaultValue={0}
                      onChange={(e): void =>
                        handleMonthChange(e.target.value as number)
                      }
                    >
                      <MenuItem value={0}>{queryPath.month}</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={11}>11</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className='flex h-full'>
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
                        thisMonthData={monthData}
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

export default Index;
