import { groupingCostData } from '@/slice/costDataSlice';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

const CustomLabel = (props: any) => {
  return (
    <text x={props.x} y={props.y} dy={-10} fill='#777' className='text-sm'>
      {`¥${props.value.toLocaleString()}`}
    </text>
  );
};

const Chart = () => {
  const router = useRouter();
  const open = useSelector((state: RootState) => state.drawer.open);
  const AllCostData = useSelector(
    (state: RootState) => state.costData.allCostData
  );
  const groupedCostData = useSelector(
    (state: RootState) => state.costData.groupedCostData
  );
  const groupData = useSelector(
    (state: RootState) => state.groupData.groupData
  );

  const barChartData = groupedCostData?.data.map((data) => {
    if (groupData.rentCost) {
      return {
        month: data.month,
        total: data.total + groupData.rentCost,
      };
    } else {
      return {
        month: data.month,
        total: data.total,
      };
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(groupingCostData(AllCostData));
  }, [AllCostData]);

  const handleClickXAxis = (e: any) => {
    router.push({
      pathname: 'detail',
      query: {
        year: groupedCostData?.year,
        month: e.payload.month,
        current: 'detail',
      },
    });
  };

  return (
    <div className='container mt-4 space-y-4'>
      <span className='text-gray-500 text-2xl font-bold flex justify-center'>
        {groupedCostData?.year}
        <small>年</small>
      </span>
      <Suspense fallback={<div>loading...</div>}>
        <BarChart
          id='myChart'
          width={open ? 1100 : 1300}
          height={650}
          data={barChartData}
        >
          <CartesianGrid strokeDasharray='1 1' />
          <XAxis dataKey='month' />
          <YAxis
            dataKey='total'
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `¥${value.toLocaleString()}`}
            width={100}
          />
          <Bar
            dataKey='total'
            fill='#55B4B7'
            barSize={60}
            cursor={'pointer'}
            onClick={handleClickXAxis}
          >
            <LabelList
              dataKey='total'
              position='top'
              content={<CustomLabel />}
            />
          </Bar>
        </BarChart>
      </Suspense>
    </div>
  );
};

export default Chart;
