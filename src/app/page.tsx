'use client';

import { Button, Card, CardHeader, CardBody } from "@heroui/react";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/countries');
  };

  return (
    <>
      <title>Country Explorer</title>
      <div className="flex justify-center items-center min-h-[calc(100vh-250px)]">
        <Card className="card w-full max-w-md p-6">
          <CardHeader className="flex flex-col items-center text-center">
            <h1 className="text-3xl">Bem-vindo ao Country Explorer</h1>
            <p className="text-sm text-[rgb(var(--foreground-rgb))] opacity-70 mt-1">
              Explore informações detalhadas sobre países de todo o mundo
            </p>
          </CardHeader>
          <CardBody className="mt-4">
            <Button onClick={handleEnter} className="bg-primary text-white" fullWidth size="lg">
              Entrar no Site
            </Button>
            <p className="mt-4 text-center text-sm text-[rgb(var(--foreground-rgb))] opacity-80">
              Clique acima para acessar uma lista de países e descobrir detalhes como capital, população, moedas e idiomas.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
