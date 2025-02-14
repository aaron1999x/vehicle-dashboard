import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { useQuery } from '@tanstack/react-query';
import { getVehiclesWithFilters } from '../../utils/serviceCalls/vehicles';
import { TableSkeleton } from '@/components/skeleton/table-skeleton';
import { FilterModal } from '@/components/filter-modal';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/data-range-picker';
import { ErrorDisplay } from '@/components/error-display';

import type React from 'react';
import { useFilterStore } from '@/lib/store/filterStore';

function VehicleTableContainer() {
  const { filters, setFilter } = useFilterStore();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => getVehiclesWithFilters(filters),
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter('license_plate', value || undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search by License Plate"
            className="max-w-lg"
            value={filters.license_plate || ''}
            onChange={handleSearchChange}
          />
          <DateRangePicker />
        </div>
        <FilterModal />
      </div>

      {isError && <ErrorDisplay />}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={data?.data?.result || []} />
      )}
    </div>
  );
}

export default VehicleTableContainer;
