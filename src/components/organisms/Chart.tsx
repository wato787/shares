import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

const data = [
  {
    date: '2021/1/1',
    cost: 14000,
  },
  {
    date: '2021/2/1',
    cost: 104000,
  },
  {
    date: '2021/3/1',
    cost: 44000,
  },
  {
    date: '2021/4/1',
    cost: 24000,
  },
  {
    date: '2021/5/2',
    cost: 31000,
  },
  {
    date: '2021/6/3',
    cost: 20100,
  },
  {
    date: '2021/7/4',
    cost: 2780,
  },
  {
    date: '2021/8/5',
    cost: 11890,
  },
  {
    date: '2021/9/6',
    cost: 21390,
  },
  {
    date: '2021/10/7',
    cost: 33490,
  },
  {
    date: '2021/11/7',
    cost: 23490,
  },
  {
    date: '2021/12/7',
    cost: 13490,
  },
];

const CustomLabel = (props: any) => {
  return (
    <text x={props.x} y={props.y} dy={-10} fill='#777' className='text-sm'>
      {`¥${props.value.toLocaleString()}`}
    </text>
  );
};

const Chart = () => {
  const [renderData, setRenderData] = useState<any>([]);
  const [dataYear, setDataYear] = useState<any>([]);
  const router = useRouter();
  const open = useSelector((state: RootState) => state.drawer.open);

  const handleClickXAxis = (e: any) => {
    // 月を取り出して、その月のデータを表示する。detailページへ遷移
    router.push({
      pathname: 'detail',
      query: { year: dataYear, month: e.payload.month, current: 'graph' },
    });
  };

  useEffect(() => {
    const renderData = data.map((item) => {
      const dateParts = item.date.split('/');
      return {
        month: dateParts[1] + '月',
        cost: item.cost,
      };
    });

    const dataYear = data.map((item) => {
      const dateParts = item.date.split('/');
      return {
        year: dateParts[0],
      };
    })[0].year;

    setRenderData(renderData);
    setDataYear(dataYear);
  }, []);

  return (
    <div className='container mt-4 space-y-4'>
      <span className='text-gray-500 text-2xl font-bold flex justify-center'>
        {dataYear}
        <small>年</small>
      </span>
      <Suspense fallback={<div>loading...</div>}>
        <BarChart
          id='myChart'
          width={open ? 1100 : 1300}
          height={650}
          data={renderData}
        >
          <CartesianGrid strokeDasharray='5 5' />
          <XAxis dataKey='month' />
          <YAxis
            dataKey='cost'
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `¥${value.toLocaleString()}`}
            width={100}
          />
          <Bar
            type='monotone'
            dataKey='cost'
            fill='#55B4B7'
            barSize={60}
            cursor={'pointer'}
            onClick={handleClickXAxis}
          >
            <LabelList
              dataKey='cost'
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
