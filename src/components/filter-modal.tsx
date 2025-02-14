'use client';

import { useState, useEffect } from 'react';
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
  VehicleRequest,
  VehicleStatus,
  VehicleType,
} from 'utils/types';
import { Filter, XCircleIcon } from 'lucide-react';
import { useFilterStore } from '@/lib/store/filterStore';

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
  const { filters, setFilter, resetFilters } = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    setVehicleType((filters.vehicle_type as VehicleType) ?? '');
    setApprovalStatus(filters.approval_status ?? '');
    setVehicleStatus(filters.vehicle_status ?? '');
    setMinCapacity(filters.passenger_capacity_min ?? '');
    setMaxCapacity(filters.passenger_capacity_max ?? '');
  }, [filters]);

  const isFilterActive = Object.values(filters).some(
    (value) => value !== undefined
  );

  const clearModalFilters = () => {
    setVehicleType('');
    setApprovalStatus('');
    setVehicleStatus('');
    setMinCapacity('');
    setMaxCapacity('');

    // Clear all filters except mtime_from and mtime_to as they are not present in modal
    Object.keys(filters).forEach((key) => {
      if (key !== 'mtime_from' && key !== 'mtime_to') {
        setFilter(key as keyof VehicleRequest, undefined);
      }
    });

    setIsOpen(false);
  };
  const clearAllFilters = () => {
    setVehicleType('');
    setApprovalStatus('');
    setVehicleStatus('');
    setMinCapacity('');
    setMaxCapacity('');
    resetFilters();
  };

  const submitFilters = () => {
    setFilter('vehicle_type', vehicleType || undefined);
    setFilter('approval_status', approvalStatus !== '' ? approvalStatus : null); //cannot use "|| undefined" here as if its 0(falsey) , it automatically becomes undefined and filter wont work
    setFilter('vehicle_status', vehicleStatus !== '' ? vehicleStatus : null);
    setFilter('passenger_capacity_min', minCapacity || undefined);
    setFilter('passenger_capacity_max', maxCapacity || undefined);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="font-normal w-full md:w-auto">
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
                  setApprovalStatus(Number(value) as ApprovalStatus)
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
                onValueChange={(value) => {
                  setVehicleStatus(Number(value) as VehicleStatus);
                }}
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
                    setMinCapacity(e.target.value ? Number(e.target.value) : '')
                  }
                />
                <Input
                  type="number"
                  id="maxCapacity"
                  placeholder="Max"
                  value={maxCapacity}
                  onChange={(e) =>
                    setMaxCapacity(e.target.value ? Number(e.target.value) : '')
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={clearModalFilters}>
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
          onClick={clearAllFilters}
          className="group flex items-center gap-2"
        >
          <XCircleIcon className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
          <span className="group-hover:text-red-500">Clear all</span>
        </Button>
      )}
    </div>
  );
}
