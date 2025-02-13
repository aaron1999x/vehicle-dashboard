'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type {
  ApprovalStatus,
  VehicleStatus,
  VehicleType,
  VehicleRequest,
} from 'utils/types';
import { Filter, XCircleIcon } from 'lucide-react';

// Create mappings for display values
const approvalStatusMap = {
  0: 'Draft',
  1: 'Approved',
  2: 'Pending',
  3: 'Rejected',
} as const;

const vehicleStatusMap = {
  0: 'Active',
  1: 'Inactive',
  2: 'Decommissioned',
} as const;

interface FilterModalProps {
  filters: Partial<VehicleRequest>;
  onFilterChange: (filters: Partial<VehicleRequest>) => void;
}

export function FilterModal({ filters, onFilterChange }: FilterModalProps) {
  const [vehicleType, setVehicleType] = useState<VehicleType | ''>(
    (filters.vehicle_type as VehicleType) ?? ''
  );
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus | ''>(
    filters.approval_status ?? ''
  );
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus | ''>(
    filters.vehicle_status ?? ''
  );
  const [minCapacity, setMinCapacity] = useState<number | ''>(
    filters.passenger_capacity_min ?? ''
  );
  const [maxCapacity, setMaxCapacity] = useState<number | ''>(
    filters.passenger_capacity_max ?? ''
  );
  const [isOpen, setIsOpen] = useState(false);
  const isFilterActive =
    vehicleType ||
    approvalStatus !== '' ||
    vehicleStatus !== '' ||
    minCapacity !== '' ||
    maxCapacity !== '';

  const clearFilters = () => {
    setVehicleType('');
    setApprovalStatus('');
    setVehicleStatus('');
    setMinCapacity('');
    setMaxCapacity('');
    onFilterChange({});
    setIsOpen(false);
  };

  const submitFilters = () => {
    const newFilters: Partial<VehicleRequest> = {
      vehicle_type: vehicleType !== '' ? vehicleType : undefined,
      approval_status: approvalStatus !== '' ? approvalStatus : undefined,
      vehicle_status: vehicleStatus !== '' ? vehicleStatus : undefined,
      passenger_capacity_min:
        minCapacity !== '' ? Number(minCapacity) : undefined,
      passenger_capacity_max:
        maxCapacity !== '' ? Number(maxCapacity) : undefined,
    };

    onFilterChange(newFilters);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="font-normal">
            <Filter /> Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Options</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="vehicleType"
                className="font-medium text-sm text-gray-700"
              >
                Vehicle Type
              </label>
              <Select
                value={vehicleType}
                onValueChange={(value: VehicleType) => setVehicleType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Truck">Truck</SelectItem>
                  <SelectItem value="Bus">Bus</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                  <SelectItem value="Taxi">Taxi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="approvalStatus"
                className="font-medium text-sm text-gray-700"
              >
                Approval Status
              </label>
              <Select
                value={approvalStatus?.toString() || ''}
                onValueChange={(value) =>
                  setApprovalStatus(Number.parseInt(value) as ApprovalStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select approval status">
                    {approvalStatus !== ''
                      ? approvalStatusMap[approvalStatus]
                      : 'Select approval status'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(approvalStatusMap).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="vehicleStatus"
                className="font-medium text-sm text-gray-700"
              >
                Vehicle Status
              </label>
              <Select
                value={vehicleStatus?.toString() || ''}
                onValueChange={(value) =>
                  setVehicleStatus(Number.parseInt(value) as VehicleStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle status">
                    {vehicleStatus !== ''
                      ? vehicleStatusMap[vehicleStatus]
                      : 'Select vehicle status'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(vehicleStatusMap).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="passengerCapacity"
                className="font-medium text-sm text-gray-700"
              >
                Passenger Capacity
              </label>
              <div className=" grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  id="minCapacity"
                  placeholder="Min"
                  value={minCapacity}
                  onChange={(e) =>
                    setMinCapacity(
                      e.target.value ? Number.parseInt(e.target.value) : ''
                    )
                  }
                />
                <Input
                  type="number"
                  id="maxCapacity"
                  placeholder="Max"
                  value={maxCapacity}
                  onChange={(e) =>
                    setMaxCapacity(
                      e.target.value ? Number.parseInt(e.target.value) : ''
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button onClick={submitFilters}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Reset Filters Button (Only Show If Filters Are Active) */}
      {isFilterActive && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilters}
          className="group ml-2"
        >
          <XCircleIcon className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
        </Button>
      )}
    </div>
  );
}
