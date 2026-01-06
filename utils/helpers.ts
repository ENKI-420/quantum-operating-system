export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const generateGeneticHash = (): string => {
  return Array(12)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
};

export const getRandomElement = <T,>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
};
