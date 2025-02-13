import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[
            'License Plate',
            'Owner',
            'Type',
            'Status',
            'Driver',
            'Trips',
            'Contact',
            'Capacity',
            'Updated',
          ].map((header) => (
            <TableHead key={header}>
              <Skeleton className="h-4 w-[80%]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, i) => (
          <TableRow key={i}>
            {/* License Plate */}
            <TableCell>
              <Skeleton className="h-[40px] w-[120px] bg-gray-900" />
            </TableCell>
            {/* Owner */}
            <TableCell>
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
            {/* Type */}
            <TableCell>
              <Skeleton className="h-4 w-[60px]" />
            </TableCell>
            {/* Status */}
            <TableCell>
              <Skeleton className="h-6 w-[80px] rounded-full" />
            </TableCell>
            {/* Driver */}
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            {/* Trips */}
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[60px]" />
              </div>
            </TableCell>
            {/* Contact */}
            <TableCell>
              <Skeleton className="h-4 w-[120px]" />
            </TableCell>
            {/* Capacity */}
            <TableCell>
              <Skeleton className="h-4 w-[30px]" />
            </TableCell>
            {/* Updated */}
            <TableCell>
              <Skeleton className="h-4 w-[120px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
