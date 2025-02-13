import { useQuery } from '@tanstack/react-query';
import { getVehiclesHighlight } from '../../utils/serviceCalls/vehicles';
import CardStatSkeleton from '@/components/skeleton/card-stat-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ban, ListTodo, PencilLine } from 'lucide-react';
import { ErrorDisplay } from '@/components/error-display';
function VehicleStatContainer() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehiclesHighlight,
  });

  if (isError) {
    return <ErrorDisplay />;
  }

  if (isLoading) {
    return <CardStatSkeleton />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Draft</CardTitle>
          <PencilLine className="text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-500">
            {data.data?.total_draft}
          </div>
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
          <div className="text-3xl font-bold text-blue-500">
            {data.data?.total_pending}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Rejected</CardTitle>
          <Ban className=" text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-500">
            {data.data?.total_rejected}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VehicleStatContainer;
