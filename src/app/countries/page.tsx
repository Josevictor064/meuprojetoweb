// app/(pages)/countries/page.tsx

import {
  Link as NextUILink,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@nextui-org/react";
import type { Metadata } from "next";

interface Country {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
}

async function getCountries(): Promise<Country[]> {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3",
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) {
    throw new Error("Falha ao buscar os dados dos países.");
  }
  const countries: Country[] = await res.json();
  return countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
}

export const metadata: Metadata = {
  title: "Países do Mundo | Country Explorer",
  description: "Navegue por todos os países do mundo.",
};

export default async function CountriesListPage() {
  const countries = await getCountries();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-tight">
        Países do Mundo
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <Card
            shadow="sm"
            key={country.cca3}
            isPressable
            as={NextUILink}
            href={`/countries/${encodeURIComponent(country.name.common)}`}
            className="hover:scale-105 transition-transform"
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={
                  country.flags.alt ||
                  `Bandeira do(a) ${country.name.common}`
                }
                className="object-cover w-full h-[150px]"
                src={country.flags.svg}
              />
            </CardBody>
            <CardHeader className="flex-col items-start p-4">
              <h4 className="font-bold text-large">
                {country.name.common}
              </h4>
              <small className="text-default-500">{country.region}</small>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
