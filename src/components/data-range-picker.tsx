'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFilterStore } from '@/lib/store/filterStore';

export function DateRangePicker() {
  const { filters, setFilter } = useFilterStore();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  React.useEffect(() => {
    // Initialize the date state from the store
    if (filters.mtime_from || filters.mtime_to) {
      setDate({
        from: filters.mtime_from
          ? new Date(filters.mtime_from * 1000)
          : undefined,
        to: filters.mtime_to ? new Date(filters.mtime_to * 1000) : undefined,
      });
    } else {
      setDate(undefined); //this is important , if not i clear filters from another place , the date will still show on the calendar
    }
  }, [filters.mtime_from, filters.mtime_to]);

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    setFilter(
      'mtime_from',
      newDate?.from
        ? Math.floor(newDate.from.setHours(0, 0, 0, 0) / 1000)
        : undefined
    );
    setFilter(
      'mtime_to',
      newDate?.to
        ? Math.floor(newDate.to.setHours(23, 59, 59, 999) / 1000)
        : undefined
    );
  };

  const handleClear = () => {
    setDate(undefined);
    setFilter('mtime_from', undefined);
    setFilter('mtime_to', undefined);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'md:w-[250px] w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date(2021, 0, 1)}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {date && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="group"
        >
          <XCircleIcon className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
        </Button>
      )}
    </div>
  );
}
