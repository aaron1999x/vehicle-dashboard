import { VehicleRequest } from 'utils/types';
import { create } from 'zustand';

interface FilterState {
  filters: Partial<VehicleRequest>;
  setFilter: (key: keyof VehicleRequest, value: any) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  //creating a store simplifies the fact that i dont have to keep passing props in and out of parent/child
  filters: {},
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: {} }),
}));
