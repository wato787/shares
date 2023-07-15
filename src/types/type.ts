export type CurrentPageType = {
  query: {
    current: string;
  };
};

export type Current = {
  current: string | undefined | null;
};

// フォームで入力するデータ
export type CostData = {
  date: string; //2021-01-01
  cost: number; //100000
  costType: string; //utilityなど家賃、雑費などを英語で
};
