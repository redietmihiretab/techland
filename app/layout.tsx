import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/techland/site-footer";
import { SiteNavbar } from "@/components/techland/site-navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techland-rho-vercel-app.vercel.app"),
  title: "Techland — Power. Performance. Precision.",
  description:
    "Techland is a premium electronics store for laptops, desktops, accessories, and high-performance gadgets.",
  openGraph: {
    title: "Techland — Power. Performance. Precision.",
    description: "Premium electronics curated for performance and clarity.",
    url: "https://techland-rho.vercel.app/",
    siteName: "Techland",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Techland Premium Electronics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techland — Power. Performance. Precision.",
    description: "Premium electronics curated for performance and clarity.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            <CartProvider>
              <SiteNavbar />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
