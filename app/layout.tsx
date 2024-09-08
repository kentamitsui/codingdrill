import type { Metadata } from 'next'
import "./globals.css"

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'create a coding test problem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="Content-Type" content="charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/split.js/1.6.5/split.min.js"
          integrity="sha512-lNjb0qWDVvt1zfSiXufaxtlFtenve3BLbvljxuMXuSr0DE0HYp5OhX0u89uwNd6MvlX1bgJ8ulfG4JMGurs8UA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          async
        />
      </head>
      {children}
      <script src="localstorage.js" async />
      <script src="../node_modules/monaco-editor/min/vs/loader.js" async />
      <script src="monacoEditor.js" async />
      <script src="splitter.js" async />
      <script src="colorTheme.js" async />
      <script src="script.js" async />
    </html>
  );
}
