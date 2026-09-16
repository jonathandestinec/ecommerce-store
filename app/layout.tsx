import type { Metadata } from "next";
import "./globals.css";
import { poppins, volkhov } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "FASCO Ecommerce Store",
  description: "Online shopping website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.className} ${volkhov.className} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col">

        {children}
      </body>
    </html>
  );
}
