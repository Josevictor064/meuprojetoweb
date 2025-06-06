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

async function getCountry(nome: string): Promise<CountryDetail> {
  const res = await fetch(`https://restcountries.com/v3.1/name/${nome}?fullText=true`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`Não foi possível encontrar o país: ${nome}`);
  }
  const data = await res.json();
  return data[0];
}

// Tipagem correta
type Props = {
  params: {
    nome: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function CountryDetailPage({ params }: Props) {
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
              <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
              <p><strong>População:</strong> {country.population.toLocaleString('pt-BR')}</p>
              <p><strong>Continente:</strong> {country.region}</p>
              <p><strong>Sub-região:</strong> {country.subregion}</p>
              <div>
                <strong>Moedas:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.values(country.currencies || {}).map(c => (
                    <Chip key={c.name} variant="flat">{c.name} ({c.symbol})</Chip>
                  ))}
                </div>
              </div>
              <div>
                <strong>Idiomas:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.values(country.languages || {}).map(lang => (
                    <Chip key={lang} variant="flat">{lang}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
