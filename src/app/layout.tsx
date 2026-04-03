import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Skinfidential Series",
  description: `TheSkinfidentialSeries brings you the hottest and finest
                skincare products from Foreign and Nigerian reputable brands -
                all in one place! If it works, it's here. If it
                doesn't? We don't stock it!`,
  metadataBase: new URL("https://the-skinfidential-series.vercel.app"),
  openGraph: {
    title: "TheSkinfidentialSeries",
    description: `TheSkinfidentialSeries brings you the hottest and finest
                skincare products from Foreign and Nigerian reputable brands -
                all in one place! If it works, it's here. If it
                doesn't? We don't stock it!`,
    url: "https://the-skinfidential-series.vercel.app",
    siteName: "TheSkinfidentialSeries",
    images: "/logo.jpg",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <ReduxProvider>
          {children}
          <Analytics />
        </ReduxProvider>
      </body>
    </html>
  );
}
