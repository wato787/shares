export const Color = {
  RENT: '#55B4B7',
  FOOD: '#00ff00',
  MISCELLANEOUS: '#ff00ff',
  WATER: '#00ffff',
  GAS: '#ff7f50',
  UTILITIES: '#ffd700',
  COMMUNICATION: '#0000ff',
  OTHER: '#000000',
} as const;

export type Color = (typeof Color)[keyof typeof Color];
