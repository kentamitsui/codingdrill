import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Coding Drill",
  description: "coding test practice app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" href="/icon.svg"></link>
      </head>
      <body className="mx-auto flex h-screen max-w-[1920px] flex-col p-5 text-black dark:bg-[#1e1e1e] dark:text-[#d4d4d4]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
