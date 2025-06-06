import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] gap-4">
      <Spinner size="lg" color="primary" />
      <p className="text-lg font-medium text-primary animate-pulse">
        Explorando o globo...
      </p>
    </div>
  );
}
