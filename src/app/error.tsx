'use client';

import { Button } from '@heroui/react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center p-4">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Algo deu errado!</h2>
      <p className="mb-6 text-[rgb(var(--foreground-rgb))] max-w-lg">
        {error.message || "Não foi possível carregar o conteúdo solicitado."}
      </p>
      <Button color="primary" variant="solid" onClick={reset}>
        Tentar Novamente
      </Button>
    </div>
  );
}