import { ThemeProvider } from "@/components/theme-provider";
import { LoadingScreenProvider } from "@/features/loading-screen/provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingScreenProvider>{children}</LoadingScreenProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
