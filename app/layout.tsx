import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RS Fit Club – Gym Management & Fitness',
  description: 'Complete Gym Management System, Door Access Control, and Member Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#fcfbf9] text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
