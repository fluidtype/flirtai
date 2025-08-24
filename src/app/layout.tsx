import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlirtAI",
  description: "AI-assisted relationship coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg text-fg">{children}</body>
    </html>
  );
}
