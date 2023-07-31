import { Color } from '@/utils/Color';
import { CostType } from '@/utils/CostType';
import classNames from 'classnames';
import React, { useMemo } from 'react';

interface Props {
  type: CostType;
}

const CostColorTitle = (props: Props) => {
  const color = useMemo((): string => {
    if (props.type === CostType.RENT) return Color.RENT;
    if (props.type === CostType.FOOD) return Color.FOOD;
    if (props.type === CostType.GAS) return Color.GAS;
    if (props.type === CostType.MISCELLANEOUS) return Color.MISCELLANEOUS;
    if (props.type === CostType.UTILITIES) return Color.UTILITIES;
    if (props.type === CostType.WATER) return Color.WATER;
    if (props.type === CostType.COMMUNICATION) return Color.COMMUNICATION;
    if (props.type === CostType.OTHER) return Color.OTHER;
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
      <div className={classNames('w-3 h-3', `bg-[${color}]`)} />
      <span className='text-gray-600 font-bold'>{title}</span>
    </div>
  );
};

export default CostColorTitle;
