import { selector } from 'recoil';
import { todosAtom } from '../atoms/todosAtom';
import { filterAtom } from '../atoms/filterAtom';

export const filteredTodosSelector = selector({
  key: 'filteredTodosSelector',
  get: ({ get }) => {
    const todos = get(todosAtom);
    const filter = get(filterAtom);

    switch (filter) {
      case 'completed':
        return todos.filter(t => t.completed);
      case 'pending':
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  },
});
