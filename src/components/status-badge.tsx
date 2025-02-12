import React from 'react';
import { cn } from '@/lib/utils';
import { StatusType } from 'utils/types';

interface BadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<BadgeProps> = ({ status, className }) => {
  const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';

  const statusClasses: Record<StatusType, string> = {
    Draft: 'bg-gray-500 text-white',
    Pending: 'bg-blue-500 text-white',
    Rejected: 'bg-red-500 text-white',
    Approved: 'bg-green-500 text-white',
  };

  return (
    <span className={cn(baseClasses, statusClasses[status], className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
