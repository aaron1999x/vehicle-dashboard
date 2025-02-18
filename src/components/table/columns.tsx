import { ColumnDef } from '@tanstack/react-table';
import { StatusType, Trip, VehicleResponse } from 'utils/types';
import StatusBadge from '../status-badge';
import { ArrowRight } from 'lucide-react';

export const columns: ColumnDef<VehicleResponse>[] = [
  {
    accessorKey: 'license_plate',
    header: 'License Plate',
    cell: ({ row }) => {
      const license = row.getValue('license_plate') as string;

      return (
        <div className="inline-block bg-black text-white px-4 py-2 rounded-md font-mono tracking-widest text-center min-w-[140px]">
          <div className=" text-lg font-bold">{license}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'vehicle_owner',
    header: 'Owner',
  },
  {
    accessorKey: 'vehicle_type',
    header: 'Type',
  },
  {
    accessorKey: 'vehicle_status',
    header: 'Vehicle Status',
  },
  {
    accessorKey: 'approval_status',
    header: 'Approval Status',
    cell: ({ row }) => {
      const status = row.getValue('approval_status') as StatusType;

      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: 'driver',
    header: 'Driver',
  },
  {
    accessorKey: 'trips',
    header: 'Trips',
    cell: ({ row }) => {
      const trips = row.getValue('trips') as Trip[];

      if (trips.length === 0) {
        return <span>-</span>; // Handle missing data
      }

      return (
        <div className="space-y-1">
          {trips.map((trip, index) => (
            <div key={index} className="flex items-center text-sm">
              <span>{trip.from}</span>
              <ArrowRight className="w-4 h-4 mx-2" />
              <span>{trip.to}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: 'contact',
    header: 'Contact Number',
    accessorFn: (row) => ({
      country_code: row.country_code,
      contact_number: row.contact_number,
    }),
    cell: ({ row }) => {
      const { country_code, contact_number } = row.getValue('contact') as {
        country_code: number;
        contact_number: number;
      };

      return (
        <span>
          (+{country_code}) {contact_number}
        </span>
      );
    },
  },
  {
    accessorKey: 'passenger_capacity',
    header: 'Passenger Capacity',
  },
  {
    accessorKey: 'mtime',
    header: 'Last Updated Time',
    cell: ({ row }) => {
      const timestamp = row.getValue('mtime') as number;

      if (!timestamp) return <span>-</span>; // Handle missing data

      const formattedDate = new Date(timestamp * 1000).toLocaleString(); // Convert Unix timestamp to readable format

      return <span>{formattedDate}</span>;
    },
  },
];
