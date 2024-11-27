import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { FlightsProvider } from "@/stores/flights";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tinybird + DynamoDB Flights Demo",
  description: "Tinybird + DynamoDB Flights Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <FlightsProvider>{children}</FlightsProvider>
      </body>
    </html>
  );
}
