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
  date: any; //2021-01-01
  cost: number; //100000
  costType: string; //utilityなど家賃、雑費などを英語で
  inputUserName?: string; //入力したユーザー名
  inputUserId?: string; //入力したユーザーID
  inputUserPhotoUrl?: string; //入力したユーザーのプロフィール画像
};

export type GroupData = {
  id: string;
  name: string;
  rentCost?: number;
  bankBalance?: number;
};

export type GroupUser = {
  id: string;
  name: string;
  photoUrl: string;
  position: string;
};
