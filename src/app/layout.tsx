import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true,
  display: 'swap',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Microsoft JhengHei',
    'Microsoft YaHei',
    'PingFang TC',
    'PingFang SC',
    'Hiragino Sans GB',
    'Source Han Sans TC',
    'Source Han Sans CN',
    'Source Han Sans',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A modern todo application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={notoSansTC.className}>
      <body className="antialiased bg-gradient-to-br from-orange-50 via-orange-100/70 to-slate-50">
        <div className="min-h-screen relative pb-16">
          {children}
          <footer className="absolute bottom-0 left-0 right-0 py-4 text-center text-sm text-slate-500">
            <p>
              Made with ❤️ by{' '}
              <a
                href="https://github.com/Ynoob87"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                small R
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
