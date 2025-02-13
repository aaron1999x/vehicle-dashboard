import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { useQuery } from '@tanstack/react-query';
import { getVehiclesWithFilters } from '../../utils/serviceCalls/vehicles';
import { TableSkeleton } from '@/components/skeleton/table-skeleton';
import { useState } from 'react';
import type { VehicleRequest } from '../../utils/types';
import { FilterModal } from '@/components/filter-modal';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/data-range-picker';
import { DateRange } from 'react-day-picker';
import { ErrorDisplay } from '@/components/error-display';

function VehicleTableContainer() {
  const [filters, setFilters] = useState<Partial<VehicleRequest>>({
    vehicle_type: undefined,
    approval_status: undefined,
    vehicle_status: undefined,
    passenger_capacity_min: undefined,
    passenger_capacity_max: undefined,
    license_plate: undefined,
    mtime_from: undefined,
    mtime_to: undefined,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => getVehiclesWithFilters(filters),
  });

  console.log(data);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFilters((prevFilters) => {
      if (!value) {
        const { license_plate, ...restFilters } = prevFilters;
        return restFilters;
      }

      return {
        ...prevFilters,
        license_plate: value,
      };
    });
  };

  const handleDateChange = (dateRange: DateRange | undefined) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      mtime_from: dateRange?.from
        ? Math.floor(new Date(dateRange.from).setHours(0, 0, 0, 0) / 1000) //convert to Unix, Start of the day
        : undefined,
      mtime_to: dateRange?.to
        ? Math.floor(new Date(dateRange.to).setHours(23, 59, 59, 999) / 1000) //convert to Unix, End of the day
        : undefined,
    }));
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
          <DateRangePicker onDateChange={handleDateChange} />
        </div>
        <FilterModal filters={filters} onFilterChange={setFilters} />
      </div>

      {/* error state */}
      {isError && <ErrorDisplay />}
      {isLoading ? ( //loading state
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={data?.data?.result || []} />
      )}
    </div>
  );
}

export default VehicleTableContainer;
