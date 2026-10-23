import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { content, shared } from "@/data/content";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// latin-ext e vietnamese: acentos das saudações (ex.: "Xin chào!") na mesma fonte do resto
const grotesk = Space_Grotesk({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

// Metadados em português (idioma padrão). A troca de idioma no site atualiza o título da aba.
const { meta } = content.pt;

export const metadata: Metadata = {
  // Base para URLs absolutas nos metadados (prévia de links, URL canônica).
  metadataBase: new URL(shared.siteUrl),
  alternates: { canonical: "/" },
  title: meta.title,
  description: meta.description,
  authors: [{ name: shared.fullName }],
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    url: "/",
    siteName: shared.name,
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable}`}>
      <body className="noise">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
