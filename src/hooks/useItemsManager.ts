// src/hooks/useItemsManager.ts
import { useReducer, useMemo } from 'react';
import Fuse from 'fuse.js';
import orderBy from 'lodash/orderBy';
import itemsData from '../../product-data.json';

export type SortState = 'none' | 'asc' | 'desc';

interface State {
  query: string;
  sort: SortState;
  deletedIds: Set<string>;
  selectedIds: Set<string>;
}

type Action =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_SORT'; payload: SortState }
  | { type: 'RESET' }
  | { type: 'TOGGLE_SELECT'; payload: string }
  | { type: 'DELETE_SELECTED' };

const initialState: State = {
  query: '',
  sort: 'none',
  deletedIds: new Set(),
  selectedIds: new Set(),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };

    case 'SET_SORT':
      return { ...state, sort: action.payload };

    case 'RESET':
      return initialState;

    case 'TOGGLE_SELECT': {
      const newSet = new Set(state.selectedIds);
      if (newSet.has(action.payload)) newSet.delete(action.payload);
      else newSet.add(action.payload);
      return { ...state, selectedIds: newSet };
    }

    case 'DELETE_SELECTED': {
      const newDeleted = new Set(state.deletedIds);
      state.selectedIds.forEach(id => newDeleted.add(id));
      return { ...state, deletedIds: newDeleted, selectedIds: new Set() };
    }

    default:
      return state;
  }
}

export function useItemsManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fuse uses full data but we’ll ignore deleted ones
  const activeItems = useMemo(
    () => itemsData.filter(item => !state.deletedIds.has(item.id.toString())),
    [state.deletedIds],
  );

  const fuse = useMemo(
    () =>
      new Fuse(activeItems, {
        keys: ['title', 'tags'],
        threshold: 0.3,
      }),
    [activeItems],
  );

  const filtered = useMemo(() => {
    if (!state.query.trim()) return activeItems;
    const results = fuse.search(state.query);
    return results.map(r => r.item);
  }, [state.query, activeItems, fuse]);

  const sorted = useMemo(() => {
    if (state.sort === 'asc') return orderBy(filtered, ['title'], ['asc']);
    if (state.sort === 'desc') return orderBy(filtered, ['title'], ['desc']);
    return filtered;
  }, [state.sort, filtered]);

  return {
    items: sorted,
    query: state.query,
    sort: state.sort,
    selectedIds: state.selectedIds,
    setQuery: (q: string) => dispatch({ type: 'SET_QUERY', payload: q }),
    setSort: (s: SortState) => dispatch({ type: 'SET_SORT', payload: s }),
    toggleSelect: (id: string) => dispatch({ type: 'TOGGLE_SELECT', payload: id }),
    deleteSelected: () => dispatch({ type: 'DELETE_SELECTED' }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}
