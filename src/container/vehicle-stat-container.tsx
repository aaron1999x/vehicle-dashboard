import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getVehicles } from '../../utils/serviceCalls/vehicles';
import CardStatSkeleton from '@/components/skeleton/card-stat-skeleton';
import { VehicleResponse } from 'utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ban, LaptopMinimalCheck, ListTodo, PencilLine } from 'lucide-react';
function VehicleStatContainer() {
  const [approvalCounts, setApprovalCounts] = useState({
    draft: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [isCounting, setIsCounting] = useState(true);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  useEffect(() => {
    if (data?.data?.result) {
      const counts = { draft: 0, approved: 0, pending: 0, rejected: 0 };

      data.data.result.forEach((v: VehicleResponse) => {
        if (v.approval_status === 'Draft') counts.draft++;
        else if (v.approval_status === 'Approved') counts.approved++;
        else if (v.approval_status === 'Pending') counts.pending++;
        else if (v.approval_status === 'Rejected') counts.rejected++;
      });

      setApprovalCounts(counts);
      setIsCounting(false); // Counting is complete
    }
  }, [data]);

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading || isCounting) {
    return <CardStatSkeleton />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Draft</CardTitle>
          <PencilLine className="text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-500">
            {approvalCounts?.draft}
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
            {approvalCounts?.pending}
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
            {approvalCounts?.rejected}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Approved</CardTitle>
          <LaptopMinimalCheck className=" text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-500">
            {approvalCounts?.approved}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VehicleStatContainer;
