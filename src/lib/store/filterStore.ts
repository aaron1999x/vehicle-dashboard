import { Pagination, SortBy, VehicleRequest } from 'utils/types';
import { create } from 'zustand';

interface FilterState {
  filters: Partial<VehicleRequest>;
  pagination: Pagination;
  sorting: SortBy[];
  setFilter: (key: keyof VehicleRequest, value: any) => void;
  setPagination: (page: number, limit: number) => void;
  setSorting: (sorting: SortBy[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  //creating a store simplifies the fact that i dont have to keep passing props in and out of parent/child
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
  },
  sorting: [],
  setSorting: (sorting) =>
    set(() => ({
      sorting,
      // pagination: { page: 1, limit: 10 }, // nt sure if i need this
    })),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      pagination: { ...state.pagination, page: 1 }, // Reset page to 1 when filter changes
    })),
  setPagination: (page, limit) =>
    set(() => {
      return { pagination: { page, limit } };
    }),
  resetFilters: () =>
    set(() => ({
      filters: {},
      pagination: {
        page: 1,
        limit: 10,
      },
    })),
}));
