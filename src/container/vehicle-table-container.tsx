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
import { Pagination } from '@/components/pagination';
import { useEffect } from 'react';
import { SortDropdown } from '@/components/sort-dropdown';

function VehicleTableContainer() {
  const { filters, pagination, sorting, setFilter } = useFilterStore();

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['vehicles', filters, pagination, sorting],
    queryFn: () =>
      getVehiclesWithFilters({
        ...filters,
        pagination_info: pagination,
        sort_by: sorting,
      }), //seperate pagination out of filters
  });

  useEffect(() => {
    //refetch when the pagination changes
    refetch();
  }, [refetch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter('license_plate', value || undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input
            type="text"
            placeholder="Search by License Plate"
            className="w-full sm:w-[300px]"
            value={filters.license_plate || ''}
            onChange={handleSearchChange}
          />
          <DateRangePicker />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <SortDropdown />
          <FilterModal />
        </div>
      </div>

      {isError && <ErrorDisplay />}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={columns} data={data?.data?.result || []} />
          {data?.data?.pagination_info && (
            <Pagination paginationInfo={data.data.pagination_info} />
          )}
        </>
      )}
    </div>
  );
}

export default VehicleTableContainer;
