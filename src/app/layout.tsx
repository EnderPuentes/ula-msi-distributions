import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetBrains = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Distributions Charts - Snowy Group',
  description: 'Discret Uniform, Continuous Uniform, Gamma',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrains.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
