import { CostType } from '@/utils/CostType';
import classNames from 'classnames';
import React, { useMemo } from 'react';

interface Props {
  title: string;
  type: CostType;
}

const CostColorTitle = (props: Props) => {
  const color = useMemo((): string => {
    if (props.type === CostType.RENT) return 'bg-rent';
    if (props.type === CostType.FOOD) return 'bg-food';
    if (props.type === CostType.GAS) return 'bg-gas';
    if (props.type === CostType.MISCELLANEOUS) return 'bg-miscellaneous';
    if (props.type === CostType.UTILITIES) return 'bg-utilities';
    if (props.type === CostType.WATER) return 'bg-water';
    return 'bg-gray-600';
  }, [props.type]);

  return (
    <div className='flex items-center gap-x-2'>
      <div className={classNames('w-3 h-3', color)} />
      <span className='text-gray-600 font-bold'>{props.title}</span>
    </div>
  );
};

export default CostColorTitle;
