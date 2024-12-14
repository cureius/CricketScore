import { CountryScore } from '../types';

export const formatData = (data: (string | number)[][]): CountryScore[] => {
  return data.map((item) => {
    if (item.length === 2 && typeof item[0] === 'string' && typeof item[1] === 'number') {
      return {
        country: item[0],
        score: item[1],
      };
    }
    throw new Error('Invalid data structure');
  });
};
