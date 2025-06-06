// app/(pages)/loading.tsx
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] gap-4">
      <Spinner size="lg" color="primary" />
      <p className="text-primary-600 font-medium text-lg animate-pulse">
        Explorando o globo...
      </p>
    </div>
  );
}