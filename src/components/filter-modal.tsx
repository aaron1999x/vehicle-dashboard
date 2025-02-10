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
import { ApprovalStatus, VehicleStatus } from 'utils/types';

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

export function FilterModal() {
  const [vehicleType, setVehicleType] = useState('');
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus | ''>('');
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus | ''>('');
  const [minCapacity, setMinCapacity] = useState<number | ''>('');
  const [maxCapacity, setMaxCapacity] = useState<number | ''>('');
  const [isOpen, setIsOpen] = useState(false);

  const clearFilters = () => {
    setVehicleType('');
    setApprovalStatus('');
    setVehicleStatus('');
    setMinCapacity('');
    setMaxCapacity('');
  };

  const submitFilters = () => {
    // Here you can pass the filter query to your parent component or API
    console.log({
      vehicleType,
      approvalStatus,
      vehicleStatus,
      minCapacity,
      maxCapacity,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Filters</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="vehicleType" className="text-right">
              Vehicle Type
            </label>
            <Input
              id="vehicleType"
              className="col-span-3"
              placeholder="Enter vehicle type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="approvalStatus" className="text-right">
              Approval Status
            </label>
            <Select
              value={approvalStatus?.toString() || ''}
              onValueChange={(value) =>
                setApprovalStatus(Number.parseInt(value) as ApprovalStatus)
              }
            >
              <SelectTrigger className="col-span-3">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="vehicleStatus" className="text-right">
              Vehicle Status
            </label>
            <Select
              value={vehicleStatus?.toString() || ''}
              onValueChange={(value) =>
                setVehicleStatus(Number.parseInt(value) as VehicleStatus)
              }
            >
              <SelectTrigger className="col-span-3">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="passengerCapacity" className="text-right">
              Passenger Capacity
            </label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
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
  );
}
