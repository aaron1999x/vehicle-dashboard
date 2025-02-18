import { useQuery } from '@tanstack/react-query';
import { getVehiclesHighlight } from '../../utils/serviceCalls/vehicles';
import CardStatSkeleton from '@/components/skeleton/card-stat-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownWideNarrow, Ban, ListTodo, PencilLine } from 'lucide-react';
import { ErrorDisplay } from '@/components/error-display';
import { Button } from '@/components/ui/button';
import type { ApprovalStatus } from '../../utils/types';
import { useFilterStore } from '@/lib/store/filterStore';

function VehicleStatContainer() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehiclesHighlight,
  });

  const setFilter = useFilterStore((state) => state.setFilter);

  if (isError) {
    return <ErrorDisplay />;
  }

  if (isLoading) {
    return <CardStatSkeleton />;
  }

  const handleQuickFilter = (status: ApprovalStatus) => {
    setFilter('approval_status', status);
    if (status === 2 || status === 3) {
      //if rejected or pending , send vehiclestatus active
      setFilter('vehicle_status', 0);
    } else {
      setFilter('vehicle_status', undefined);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Draft</CardTitle>
          <PencilLine className="text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gray-500">
            {data.data?.total_draft}
          </div>
          <Button
            variant="link"
            onClick={() => handleQuickFilter(0)}
            className=" flex items-center mt-2 p-0 text-gray-400 hover:text-gray-950 transition-colors"
          >
            View
            <ArrowDownWideNarrow />
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">
            Pending Information
          </CardTitle>
          <ListTodo className=" text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-blue-500">
            {data.data?.total_pending}
          </div>
          <Button
            variant="link"
            onClick={() => handleQuickFilter(2)}
            className=" flex items-center mt-2 p-0 text-gray-400 hover:text-gray-950 transition-colors"
          >
            View
            <ArrowDownWideNarrow />
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Rejected</CardTitle>
          <Ban className=" text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-red-500">
            {data.data?.total_rejected}
          </div>
          <Button
            variant="link"
            onClick={() => handleQuickFilter(3)}
            className=" flex items-center mt-2 p-0 text-gray-400 hover:text-gray-950 transition-colors"
          >
            View
            <ArrowDownWideNarrow />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default VehicleStatContainer;
