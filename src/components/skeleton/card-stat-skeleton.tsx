import { Skeleton } from '../ui/skeleton';

function CardStatSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
      <Skeleton className="w-full h-[118px] rounded-xl" />
      <Skeleton className="w-full h-[118px] rounded-xl" />
      <Skeleton className="w-full h-[118px] rounded-xl" />
      <Skeleton className="w-full h-[118px] rounded-xl" />
    </div>
  );
}

export default CardStatSkeleton;
