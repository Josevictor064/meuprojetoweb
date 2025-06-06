// app/(pages)/error.tsx
'use client';

import { Button } from '@nextui-org/react';

export default function Error({ error, reset }: { error: Error; reset: () => void; }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
      <h2 className="text-2xl font-semibold mb-4">Algo deu errado!</h2>
      <p className="mb-4">{error.message || "Não foi possível carregar o conteúdo."}</p>
      <Button color="danger" variant="ghost" onClick={() => reset()}>
        Tentar Novamente
      </Button>
    </div>
  );
}