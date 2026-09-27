import type { Metadata } from "next";
import "./globals.css";
import { poppins, volkhov } from "@/styles/fonts";
import Nav from "@/components/nav";
import FloatingActions from "@/components/floating-actions";
import CartDrawer from "@/components/cart-drawer";
import { StoreProvider } from "@/components/store-provider";
import { Analytics } from "@vercel/analytics/next"

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
      <Analytics />
        <StoreProvider>
          <div className="w-full max-w-7xl h-max mx-auto">
            <Nav />
          </div>
          {children}
          <FloatingActions />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
