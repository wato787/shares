import { CostType } from '@/utils/CostType';
import classNames from 'classnames';
import React, { useMemo } from 'react';

interface Props {
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
    if (props.type === CostType.COMMUNICATION) return 'bg-communication';
    if (props.type === CostType.OTHER) return 'bg-other';
    return 'bg-gray-600';
  }, [props.type]);

  const title = useMemo((): string => {
    if (props.type === CostType.RENT) return '家賃';
    if (props.type === CostType.FOOD) return '食費';
    if (props.type === CostType.GAS) return 'ガス代';
    if (props.type === CostType.MISCELLANEOUS) return '雑費';
    if (props.type === CostType.UTILITIES) return '光熱費';
    if (props.type === CostType.WATER) return '水道代';
    if (props.type === CostType.COMMUNICATION) return '通信費';
    if (props.type === CostType.OTHER) return 'その他';
    return 'その他';
  }, [props.type]);

  return (
    <div className='flex items-center gap-x-2'>
      <div className={classNames('w-3 h-3', color)} />
      <span className='text-gray-600 font-bold'>{title}</span>
    </div>
  );
};

export default CostColorTitle;
