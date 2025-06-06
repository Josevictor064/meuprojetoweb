// app/(pages)/page.tsx
'use client';

import { Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

export default function LoginPageAsRoot() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('simulatedLogin');
      if (isLoggedIn && pathname === '/') {
        router.replace('/countries'); // Redireciona se já estiver logado
      }
    }
  }, [router, pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (email === "explorer@dev.com" && password === "123456") {
      setMessage("Login realizado com sucesso! Redirecionando...");
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('simulatedLogin', 'true');
      }
      setTimeout(() => {
        router.push('/countries'); // Redireciona para o catálogo de países
      }, 1500);
    } else {
      setMessage("Credenciais inválidas. Tente 'explorer@dev.com' e '123456'.");
      setIsLoading(false);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('simulatedLogin');
      }
    }
  };

  return (
    <>
      <title>Login | Country Explorer</title>
      <div className="flex justify-center items-center min-h-[calc(100vh-250px)]">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Bem-vindo ao Country Explorer</h1>
            <p className="text-sm text-gray-400">Faça login para começar a explorar</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                isRequired
                type="email"
                label="Email"
                placeholder="explorer@dev.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="bordered"
              />
              <Input
                isRequired
                type="password"
                label="Senha"
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="bordered"
              />
              <Button type="submit" color="primary" isLoading={isLoading} fullWidth size="lg">
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              {message && <p className={`mt-4 text-center text-sm ${message.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
