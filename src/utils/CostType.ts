export const CostType = {
  RENT: 'rent', //家賃
  MISCELLANEOUS: 'miscellaneous', //雑費
  WATER: 'water', //水道
  GAS: 'gas', //ガス
  UTILITIES: 'utilities', //光熱費
  FOOD: 'food', //食費
  COMMUNICATION: 'communication', //通信費
  OTHER: 'other', //その他
} as const;

export type CostType = (typeof CostType)[keyof typeof CostType];
