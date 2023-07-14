import { RootState } from '@/store';
import { dammyData, groupCostData } from '@/utils/DammyData';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
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

  // 月を取り出して、その月のデータを表示する。detailページへ遷移
  const handleClickXAxis = (e: any) => {
    router.push({
      pathname: 'detail',
      query: { year: grouped.year, month: e.payload.month, current: 'graph' },
    });
  };

  const grouped = groupCostData(dammyData)[0];
  console.log(grouped);
  console.log(grouped.data);

  return (
    <div className='container mt-4 space-y-4'>
      <span className='text-gray-500 text-2xl font-bold flex justify-center'>
        {grouped.year}
        <small>年</small>
      </span>
      <Suspense fallback={<div>loading...</div>}>
        <BarChart
          id='myChart'
          width={open ? 1100 : 1300}
          height={650}
          data={grouped.data}
        >
          <CartesianGrid strokeDasharray='1 1' />
          <XAxis dataKey='month' />
          <YAxis
            dataKey='totalCost'
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `¥${value.toLocaleString()}`}
            width={100}
          />
          <Bar
            dataKey='totalCost'
            fill='#55B4B7'
            barSize={60}
            cursor={'pointer'}
            onClick={handleClickXAxis}
          >
            <LabelList
              dataKey='totalCost'
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
