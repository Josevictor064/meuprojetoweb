'use client';

import './globals.css';
import { Providers } from './providers';
import { Inter } from "next/font/google";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as HeroUILink, Button,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem
} from "@heroui/react";
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [{ label: "Países", href: "/countries" }];

  return (
    <html lang="pt-BR" className={`${inter.className} dark`}>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar onMenuOpenChange={setIsMenuOpen} isBordered isMenuOpen={isMenuOpen} className="bg-[rgb(var(--card-bg-rgb))] border-b border-divider">
              <NavbarContent>
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                  className="sm:hidden text-[rgb(var(--foreground-rgb))]"
                />
                <NavbarBrand>
                  <HeroUILink href="/" className="font-bold text-2xl text-[rgb(var(--foreground-rgb))]">
                    Country Explorer
                  </HeroUILink>
                </NavbarBrand>
              </NavbarContent>

              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={pathname.startsWith("/countries")}> 
                  <HeroUILink
                    className={pathname.startsWith("/countries") ? "text-primary" : "text-[rgb(var(--foreground-rgb))]"}
                    href="/countries"
                    aria-current={pathname.startsWith("/countries") ? "page" : undefined}
                  >
                    Países
                  </HeroUILink>
                </NavbarItem>
              </NavbarContent>

              <NavbarContent justify="end">
                <NavbarItem>
                  <Button onClick={() => router.push('/countries')} className="bg-primary text-white" variant="flat">
                    Entrar
                  </Button>
                </NavbarItem>
              </NavbarContent>

              <NavbarMenu className="bg-[rgb(var(--card-bg-rgb))]">
                {menuItems.map((item, index) => (
                  <NavbarMenuItem key={`${item.label}-${index}`} isActive={pathname === item.href}>
                    <HeroUILink
                      className={`w-full ${pathname === item.href ? "text-primary" : "text-[rgb(var(--foreground-rgb))]"}`}
                      href={item.href}
                      size="lg"
                      onPress={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </HeroUILink>
                  </NavbarMenuItem>
                ))}
              </NavbarMenu>
            </Navbar>

            <main className="container flex-grow py-8">
              {children}
            </main>

            <footer className="w-full flex items-center justify-center py-6 border-t border-divider">
              <p className="text-sm text-[rgb(var(--foreground-rgb))] opacity-50">
                © {new Date().getFullYear()} Country Explorer. Desenvolvido para Atividade Prática.
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
