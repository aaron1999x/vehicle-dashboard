import { Ban, ListTodo, PencilLine } from 'lucide-react';
import './App.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function App() {
  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-bold tracking-tight">Vehicle Dashboard</h2>

      <div className="mt-10">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Draft</CardTitle>
              <PencilLine className="text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">19</div>
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
              <div className="text-3xl font-bold">7</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Rejected</CardTitle>
              <Ban className=" text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
