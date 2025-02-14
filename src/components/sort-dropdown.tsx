'use client';

import * as React from 'react';
import { ChevronsUpDown, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useFilterStore } from '@/lib/store/filterStore';
import type { SortBy } from 'utils/types';
import { Check } from 'lucide-react';

const sortFields = [
  { label: 'Last Updated Time', value: 'mtime' },
  { label: 'License Plate', value: 'license_plate' },
] as const;

type OrderType = 0 | 1 | undefined;
type SortField = SortBy['field'] | '';

export function SortDropdown() {
  const { sorting, setSorting } = useFilterStore();
  const [orderType, setOrderType] = React.useState<OrderType>(undefined);
  const [open, setOpen] = React.useState(false);

  const handleFieldChange = (field: SortField) => {
    if (field === '') {
      setSorting([]);
    } else {
      setSorting([
        {
          field,
          ...(orderType !== undefined && { order_type: orderType }),
        } as SortBy,
      ]);
    }
  };

  const handleOrderToggle = () => {
    const newOrderType: OrderType =
      orderType === undefined ? 0 : orderType === 0 ? 1 : undefined;
    setOrderType(newOrderType);
    if (sorting.length > 0) {
      if (newOrderType === undefined) {
        setSorting(sorting.map(({ field }) => ({ field })));
      } else {
        setSorting(sorting.map((s) => ({ ...s, order_type: newOrderType })));
      }
    }
  };

  const selectedField = sorting[0]?.field || '';

  const getOrderIcon = () => {
    switch (orderType) {
      case 0:
        return <ArrowUp className="h-4 w-4" />;
      case 1:
        return <ArrowDown className="h-4 w-4" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  const getSortLabel = () => {
    const field = sortFields.find((f) => f.value === selectedField)?.label;
    const order =
      orderType === 0
        ? 'Ascending'
        : orderType === 1
        ? 'Descending'
        : 'No order';
    return field
      ? `${field}${orderType !== undefined ? ` (${order})` : ''}`
      : 'Sort by';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="md:w-[250px] w-full justify-between font-normal"
        >
          {getSortLabel()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No sort options found.</CommandEmpty>
            <CommandGroup heading="Sort field">
              {sortFields.map((field) => (
                <CommandItem
                  key={field.value}
                  onSelect={() => handleFieldChange(field.value)}
                  className="flex items-center"
                >
                  <span>{field.label}</span>
                  {selectedField === field.value && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={handleOrderToggle}
                className="flex items-center"
              >
                {getOrderIcon()}
                <span className="ml-2">
                  {orderType === 0
                    ? 'Ascending'
                    : orderType === 1
                    ? 'Descending'
                    : 'No order'}
                </span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
