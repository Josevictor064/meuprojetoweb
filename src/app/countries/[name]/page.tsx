import {
  Card, CardHeader, CardBody, Chip, Button, Divider, Image,
} from "@heroui/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CountryDetail {
  name: { common: string; official: string };
  flags: { svg: string; alt?: string };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
}

async function getCountry(name: string): Promise<CountryDetail | null> {
  const decodedName = decodeURIComponent(name);
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${decodedName}?fullText=true`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.[0] || null;
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const country = await getCountry(resolvedParams.name);
  if (!country) {
    return { title: "País não encontrado" };
  }
  return {
    title: `${country.name.common} | Detalhes`,
    description: `Informações detalhadas sobre ${country.name.common}`,
  };
}

function BackButton() {
  return (
    <Button as={Link} href="/countries" color="primary" variant="flat" className="self-start">
      ← Voltar para a lista
    </Button>
  );
}

function CountryDetails({ country }: { country: CountryDetail }) {
  return (
    <Card className="card p-4 sm:p-6 w-full">
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl">{country.name.common}</h1>
        <h2 className="text-lg text-default-500">{country.name.official}</h2>
      </CardHeader>
      <Divider className="my-4 border-divider" />
      <CardBody>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center">
            <Image
              src={country.flags.svg}
              alt={country.flags.alt || `Bandeira de ${country.name.common}`}
              className="border rounded-lg object-cover w-full max-w-sm border-divider"
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
              <p>
                {country.region} {country.subregion && (
                  <span className="text-sm text-default-500">
                    ({country.subregion})
                  </span>
                )}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Moedas</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.values(country.currencies || {}).map((c) => (
                  <Chip key={c.name} variant="flat">
                    {c.name} ({c.symbol})
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Idiomas</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.values(country.languages || {}).map((lang) => (
                  <Chip key={lang} variant="solid">
                    {lang}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default async function CountryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const country = await getCountry(resolvedParams.name);
  if (!country) notFound();

  return (
    <div className="container p-4 flex flex-col items-center space-y-6">
      <BackButton />
      <CountryDetails country={country} />
    </div>
  );
}
