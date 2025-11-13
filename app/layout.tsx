import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sagestone - Marketing Automation & CRM Platform",
  description: "All-in-one marketing automation and CRM platform to capture, nurture, and convert leads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
