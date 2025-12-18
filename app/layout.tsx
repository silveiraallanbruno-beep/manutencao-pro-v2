import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ManutençãoPro - Sistema de Gestão de Manutenção Industrial",
  description: "Sistema avançado de gestão de manutenção industrial com Supabase, OAuth, APIs, tempo real e PWA",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
