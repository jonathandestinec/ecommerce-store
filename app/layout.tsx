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
        <div className="w-full max-w-[1030px] h-max px-5 md:px-0 md:mt-8 ml-auto mr-auto">
          <Nav />
        </div>
        {children}
      </body>
    </html>
  );
}
