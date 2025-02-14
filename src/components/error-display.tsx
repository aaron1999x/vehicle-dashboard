import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

export function ErrorDisplay({
  message = 'Something went wrong. Please try again.',
}: Readonly<ErrorStateProps>) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <AlertTriangle className="w-12 h-12 text-red-500" />
      <p className="mt-2 text-lg font-medium text-gray-700">{message}</p>
    </div>
  );
}
