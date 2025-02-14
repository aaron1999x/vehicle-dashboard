import { VehicleRequest } from 'utils/types';
import { create } from 'zustand';

interface FilterState {
  filters: Partial<VehicleRequest>;
  setFilter: (key: keyof VehicleRequest, value: any) => void;
  setPagination: (page: number, limit: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  //creating a store simplifies the fact that i dont have to keep passing props in and out of parent/child
  filters: {
    pagination_info: {
      page: 1,
      limit: 10,
    },
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  setPagination: (page, limit) =>
    set((state) => ({
      filters: {
        ...state.filters,
        pagination_info: { page, limit },
      },
    })),
  resetFilters: () =>
    set({
      filters: {
        pagination_info: {
          page: 1,
          limit: 10,
        },
      },
    }),
}));
