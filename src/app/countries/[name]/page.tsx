import { Card, CardHeader, CardBody, Chip, Button, Divider, Image } from "@nextui-org/react";
import type { Metadata } from "next";
import Link from "next/link";

interface CountryDetail {
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
    alt?: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
}

// Fetch function with URL encoding and response validation
async function getCountry(nome: string): Promise<CountryDetail> {
  const encodedNome = encodeURIComponent(nome);
  const res = await fetch(`https://restcountries.com/v3.1/name/${encodedNome}?fullText=true`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`Não foi possível encontrar o país: ${nome}`);
  }
  const data = await res.json();
  if (!data || !data[0]) {
    throw new Error(`Nenhum dado encontrado para o país: ${nome}`);
  }
  return data[0];
}

// Type for params
type Props = {
  params: { nome: string };
};

// Metadata with undefined check
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.nome) {
    return {
      title: "Erro: País não especificado",
      description: "Nenhum país foi especificado na URL.",
    };
  }
  try {
    const country = await getCountry(params.nome);
    return {
      title: `${country.name.common} | Detalhes`,
      description: `Informações detalhadas sobre ${country.name.common}.`,
    };
  } catch {
    return {
      title: "País não encontrado",
      description: "Este país não foi encontrado em nossa base de dados.",
    };
  }
}

// Main page component with error handling
export default async function CountryDetailPage({ params }: Props) {
  // Handle undefined or empty nome
  if (!params.nome) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Erro: País não especificado</h1>
        <p>Por favor, especifique um país válido na URL.</p>
        <Button as={Link} href="/countries" color="primary" variant="flat" className="mt-4">
          Voltar para a lista
        </Button>
      </div>
    );
  }

  try {
    const country = await getCountry(params.nome);
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Button as={Link} href="/countries" color="primary" variant="flat" className="self-start">
          Voltar para a lista
        </Button>
        <Card shadow="lg" className="p-4 sm:p-6">
          <CardHeader className="flex flex-col items-center gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-center">{country.name.common}</h1>
            <h2 className="text-lg text-default-500 text-center">{country.name.official}</h2>
          </CardHeader>
          <Divider className="my-4" />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Image
                alt={country.flags.alt || `Bandeira do(a) ${country.name.common}`}
                src={country.flags.svg}
                className="rounded-lg shadow-md w-full"
              />
              <div className="space-y-4">
                <p><strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}</p>
                <p><strong>População:</strong> {country.population.toLocaleString("pt-BR")}</p>
                <p><strong>Continente:</strong> {country.region}</p>
                <p><strong>Sub-região:</strong> {country.subregion}</p>
                <div>
                  <strong>Moedas:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.values(country.currencies || {}).map((c) => (
                      <Chip key={c.name} variant="flat">
                        {c.name} ({c.symbol})
                      </Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Idiomas:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.values(country.languages || {}).map((lang) => (
                      <Chip key={lang} variant="flat">
                        {lang}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Erro: País não encontrado</h1>
        <p>Não foi possível encontrar o país especificado. Verifique o nome e tente novamente.</p>
        <Button as={Link} href="/countries" color="primary" variant="flat" className="mt-4">
          Voltar para a lista
        </Button>
      </div>
    );
  }
}