import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Button,
  Divider,
  Image,
} from "@nextui-org/react";
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

async function getCountry(name: string): Promise<CountryDetail> {
  const encodedName = encodeURIComponent(name);
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodedName}?fullText=true`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error(`Não foi possível encontrar o país: ${name}`);
  }

  const [country] = await res.json();
  return country;
}

interface PageProps {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const country = await getCountry(params.name);
    return {
      title: `${country.name.common} | Detalhes`,
      description: `Informações sobre ${country.name.common}`,
    };
  } catch {
    return {
      title: "País não encontrado",
      description: "Detalhes do país não disponíveis",
    };
  }
}

export default async function CountryPage({ params }: PageProps) {
  try {
    const country = await getCountry(params.name);

    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Button
          as={Link}
          href="/países"
          color="primary"
          variant="flat"
          className="mb-4"
        >
          ← Voltar
        </Button>

        <Card className="p-4 sm:p-6">
          <CardHeader className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold">{country.name.common}</h1>
            <h2 className="text-lg text-gray-500">{country.name.official}</h2>
          </CardHeader>

          <Divider className="my-4" />

          <CardBody>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <Image
                  src={country.flags.svg}
                  alt={country.flags.alt || `Bandeira de ${country.name.common}`}
                  width={320}
                  height={240}
                  className="border rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Capital</h3>
                  <p>{country.capital?.join(", ") || "Não disponível"}</p>
                </div>

                <div>
                  <h3 className="font-semibold">População</h3>
                  <p>{country.population.toLocaleString("pt-BR")}</p>
                </div>

                <div>
                  <h3 className="font-semibold">Região</h3>
                  <p>{country.region}</p>
                  {country.subregion && <p>{country.subregion}</p>}
                </div>

                {country.currencies && (
                  <div>
                    <h3 className="font-semibold">Moedas</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(country.currencies).map((currency) => (
                        <Chip key={currency.name} variant="flat">
                          {currency.name} ({currency.symbol})
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}

                {country.languages && (
                  <div>
                    <h3 className="font-semibold">Idiomas</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(country.languages).map((language) => (
                        <Chip key={language}>{language}</Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Button
          as={Link}
          href="/países"
          color="primary"
          variant="flat"
          className="mb-4"
        >
          ← Voltar
        </Button>

        <Card className="p-4 sm:p-6">
          <CardHeader>
            <h1 className="text-2xl font-bold">Erro ao carregar país</h1>
          </CardHeader>
          <CardBody>
            <p>O país solicitado não pôde ser carregado.</p>
            <p className="text-sm text-gray-500 mt-2">
              Detalhes: {(error as Error).message}
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }
}