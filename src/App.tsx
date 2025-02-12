import './App.css';

import { Input } from './components/ui/input';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FilterModal } from './components/filter-modal';

import VehicleStatContainer from './container/vehicle-stat-container';
import { DataTable } from './components/table/data-table';
import { columns } from './components/table/columns';

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

  if (isLoading) {
    return <div>load</div>;
  }

  const vehicles = data?.data?.result ?? [];

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-bold tracking-tight">Vehicle Dashboard</h2>

      <div className="mt-10 flex flex-col space-y-8">
        <VehicleStatContainer />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input type="text" placeholder="Search" className=" max-w-lg" />
            <FilterModal />
          </div>

          <div>
            <DataTable columns={columns} data={vehicles} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
