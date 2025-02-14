import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilterStore } from '@/lib/store/filterStore';
import type { PaginationInfo } from 'utils/types';

interface PaginationProps {
  paginationInfo: PaginationInfo;
}

export function Pagination({ paginationInfo }: PaginationProps) {
  const { filters, setPagination } = useFilterStore();
  const { page, limit } = filters.pagination_info || { page: 1, limit: 10 };
  const { total_records } = paginationInfo;

  const totalPages = Math.ceil(total_records / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPagination(newPage, limit);
    }
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
