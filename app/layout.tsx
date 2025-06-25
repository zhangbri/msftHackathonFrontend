import "../styles/globals.css";
import { type Metadata } from "next";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'FormSight',
  description: 'Your personal AI workout coach with real-time form correction.',
  keywords:
    'fitness, workout, computer vision, form correction, AI coach, posture analysis, real-time feedback, Meta Quest, VR fitness',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'FormSight - AI Workout Coach',
    description: 'Train smarter with real-time feedback on your workout form using AI and computer vision.',
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/apple-touch-icon.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body className="">
        {children}
      </body>
    </html>
  );
}