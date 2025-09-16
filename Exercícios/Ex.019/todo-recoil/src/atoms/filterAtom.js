import { atom } from 'recoil';

// 'all' | 'completed' | 'pending'
export const filterAtom = atom({
  key: 'filterAtom',
  default: 'all',
});
