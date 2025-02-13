'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
  onDateChange?: (date: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  onDateChange,
  className,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const handleClear = () => {
    setDate(undefined);
    if (onDateChange) {
      onDateChange(undefined);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                'w-[250px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon />
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
              defaultMonth={date?.from || new Date(2021, 0, 1)} //  Set default month to jan2021 so you dont have to go all the way back
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
    </div>
  );
}
