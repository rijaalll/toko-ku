import "./globals.css";
import "./font.css"

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preload" href="/font/Granjon.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/font/OPTINaval.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/font/Quicksand.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className="bg-zinc-50 __font_main">
        {children}
      </body>
    </html>
  );
}
