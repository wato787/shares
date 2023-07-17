import classNames from 'classnames';
import React, { ReactElement, useMemo } from 'react';

const MonthBadge = (): ReactElement => {
  const Today = new Date();
  const Month = Today.getMonth() + 1;

  const monthColor = useMemo((): string => {
    if (Month === 1) return 'text-red-300'; // January: 赤色 (#FF0000) の薄いバージョン
    if (Month === 2) return 'text-green-300'; // February: 緑色 (#00FF00) の薄いバージョン
    if (Month === 3) return 'text-blue-300'; // March: 青色 (#0000FF) の薄いバージョン
    if (Month === 4) return 'text-yellow-300'; // April: 黄色 (#FFFF00) の薄いバージョン
    if (Month === 5) return 'text-purple-300'; // May: マゼンタ (#FF00FF) の薄いバージョン
    if (Month === 6) return 'text-cyan-300'; // June: シアン (#00FFFF) の薄いバージョン
    if (Month === 7) return 'text-orange-300'; // July: オレンジ (#FFA500) の薄いバージョン
    if (Month === 8) return 'text-purple-300'; // August: 紫色 (#800080) の薄いバージョン
    if (Month === 9) return 'text-teal-300'; // September: ティール (#008080) の薄いバージョン
    if (Month === 10) return 'text-pink-300'; // October: ピンク (#FFC0CB) の薄いバージョン
    if (Month === 11) return 'text-yellow-300'; // November: ゴールド (#FFD700) の薄いバージョン
    if (Month === 12) return 'text-gray-300'; // December: グレー (#808080) の薄いバージョン
    return 'text-gray-200'; // デフォルト: グレー (#808080) の薄いバージョン
  }, [Month]);

  const monthName = useMemo((): string => {
    if (Month === 1) return 'January';
    if (Month === 2) return 'February';
    if (Month === 3) return 'March';
    if (Month === 4) return 'April';
    if (Month === 5) return 'May';
    if (Month === 6) return 'June';
    if (Month === 7) return 'July';
    if (Month === 8) return 'August';
    if (Month === 9) return 'September';
    if (Month === 10) return 'October';
    if (Month === 11) return 'November';
    if (Month === 12) return 'December';
    return 'Unknown';
  }, [Month]);

  return (
    <span
      className={classNames('font-bold text-3xl p-3 font-shares', monthColor)}
    >
      {monthName}
    </span>
  );
};

export default MonthBadge;
