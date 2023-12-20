import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/side-nav";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import PageWrapper from "@/components/page-wrapper";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital System",
  description: "Hospital System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white${inter.className}`}>
        <QueryProvider>
          <div className="flex">
            <Toaster richColors />
            <SideNav />
            <main className="flex-1">
              <MarginWidthWrapper>
                <Header />
                <HeaderMobile />
                <PageWrapper>{children}</PageWrapper>
              </MarginWidthWrapper>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
