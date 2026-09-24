import type { Metadata } from "next";
import "./globals.css";
import { poppins, volkhov } from "@/styles/fonts";
import Nav from "@/components/nav";

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
        <div className="w-full max-w-7xl h-max md:mt-17.5 ml-auto mr-auto">
          <Nav />
        </div>
        {children}
      </body>
    </html>
  );
}
