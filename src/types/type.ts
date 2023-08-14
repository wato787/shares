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
  createdAt: any; //2021-01-01
  amount: number; //100000
  costType: string; //utilityなど家賃、雑費などを英語で
  createdUserName?: string; //入力したユーザー名
  createdUserId?: string; //入力したユーザーID
  createdUserPhotoUrl?: string; //入力したユーザーのプロフィール画像
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

export type PaymentData = {
  createdAt: any;
  amount: string;
  createdUserName: string;
  id: string;
};
