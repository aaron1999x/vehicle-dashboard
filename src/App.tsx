import { Ban, LaptopMinimalCheck, ListTodo, PencilLine } from 'lucide-react';
import './App.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from './components/ui/input';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FilterModal } from './components/filter-modal';
import { VehicleBody } from 'utils/types';

import { useEffect, useState } from 'react';
import CardStatSkeleton from './components/skeleton/card-stat-skeleton';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

// const getVehicles = async () => {
//   const response = await fetch(
//     'http://ia.tnx1.xyz/api/v1/ia/vehicle/get_all_vehicles'
//   );
//   return await response.json();
// };
const getVehicles = async () => {
  const response = await axios.post(
    'http://ia.tnx1.xyz/api/v1/ia/vehicle/get_all_vehicles'
  );
  return await response.data;
};

function App() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  if (isError) {
    return <div>error</div>;
  }

  const [approvalCounts, setApprovalCounts] = useState({
    draft: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    if (data?.data?.result) {
      const counts = { draft: 0, approved: 0, pending: 0, rejected: 0 };

      data.data.result.forEach((v: VehicleBody) => {
        if (v.approval_status === 'Draft') counts.draft++;
        else if (v.approval_status === 'Approved') counts.approved++;
        else if (v.approval_status === 'Pending') counts.pending++;
        else if (v.approval_status === 'Rejected') counts.rejected++;
      });

      setApprovalCounts(counts);
      setIsCounting(false); // Counting is complete
    }
  }, [data]);

  if (isLoading || isCounting) {
    return <CardStatSkeleton />;
  }

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-bold tracking-tight">Vehicle Dashboard</h2>

      <div className="mt-10 flex flex-col space-y-8">
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

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input type="text" placeholder="Search" className=" max-w-lg" />
            <FilterModal />
          </div>

          <div>
            <div>{JSON.stringify(data)}</div>
            {/* <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
