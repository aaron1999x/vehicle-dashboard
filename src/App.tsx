import './App.css';

import VehicleStatContainer from './container/vehicle-stat-container';
import VehicleTableContainer from './container/vehicle-table-container';

function App() {
  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-bold tracking-tight">
        Westpoint Transit Dashboard
      </h2>
      <div className="mt-10 flex flex-col space-y-8">
        <VehicleStatContainer />

        <VehicleTableContainer />
      </div>
    </div>
  );
}

export default App;
