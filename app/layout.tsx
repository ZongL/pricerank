import '@/app/ui/global.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pricerank.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '特斯拉专利追踪 Tesla Patents Tracker | 最新专利数据与 AI 解读',
    template: '%s | 特斯拉专利追踪 Tesla Patents',
  },
  description:
    '每日更新特斯拉（Tesla）公开专利数据，提供专利号、发明人、发布日期、页数以及 AI 自动解读，帮助研究者、工程师和投资者快速了解 Tesla 在电动车、自动驾驶、电池、能源等领域的最新技术动向。',
  applicationName: '特斯拉专利追踪 Tesla Patents Tracker',
  generator: 'Next.js',
  keywords: [
    '特斯拉专利',
    'Tesla 专利',
    'Tesla patents',
    'Tesla patent tracker',
    '特斯拉技术',
    '电动车专利',
    '自动驾驶专利',
    'FSD 专利',
    '4680 电池',
    'Tesla 发明',
    'Tesla 专利数据库',
    'Tesla patent database',
    'EV patents',
    'autopilot patents',
  ],
  authors: [{ name: 'ZongL', url: 'https://zongl.github.io/' }],
  creator: 'ZongL',
  publisher: 'ZongL',
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/',
      en: '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: '特斯拉专利追踪 Tesla Patents Tracker',
    title: '特斯拉专利追踪 Tesla Patents Tracker | 最新专利数据与 AI 解读',
    description:
      '每日更新特斯拉公开专利数据，覆盖电动车、自动驾驶、电池、能源等领域，提供专利号、发明人、发布日期与 AI 解读。',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Tesla Patents Tracker - 特斯拉专利追踪',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '特斯拉专利追踪 Tesla Patents Tracker',
    description:
      '每日更新的特斯拉公开专利数据与 AI 解读，覆盖 FSD、4680 电池、能源等方向。',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
