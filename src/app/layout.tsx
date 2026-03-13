import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LogiTrack Pro",
  description: "Sistema de Gestão de Frotas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>
        <QueryProvider>
          <AuthProvider>
            <Toaster richColors position="top-right" />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
