import { atom } from 'recoil';

/*
  Estrutura de cada todo:
    { id: string, text: string, completed: boolean }
*/
export const todosAtom = atom({
  key: 'todosAtom',
  default: [], // lista inicial vazia
});
