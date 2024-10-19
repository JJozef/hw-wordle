import type { Metadata, Viewport } from 'next'
import { cn } from '@/lib/utils'
import { AppProvider } from './providers'
import { BgAnimationIcons } from '@/components/bg-animation-icons'
import { creepster, geistMono, geistSans } from '@/components/ui/fonts'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Halloween Wordle',
    template: '%s - Halloween Wordle'
  },
  description:
    'A spooky Halloween-themed Wordle game, all content AI-generated and managed by Cloudinary.',
  keywords: [
    'wordle',
    'halloween',
    'game',
    'word game',
    'spooky',
    'cloudinary'
  ],
  authors: [
    {
      name: 'Jose Ignacio',
      url: 'https://joseignacio.dev'
    }
  ],
  creator: "Jose Ignacio's",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://halloween-wordles-game.vercel.app',
    title: 'Halloween Wordle',
    description:
      'A spooky Halloween-themed Wordle game, all content AI-generated and managed by Cloudinary.',
    siteName: 'Halloween Wordle',
    images: [
      {
        url: 'https://halloween-wordles-game.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'Halloween Wordle'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Halloween Wordle',
    description:
      'A spooky Halloween-themed Wordle game, all content AI-generated and managed by Cloudinary.',
    images: ['https://halloween-wordles-game.vercel.app/og.png'],
    creator: '@jozefzin'
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary selection:bg-primary selection:text-primary-foreground',
          geistSans.variable,
          geistMono.variable,
          creepster.variable
        )}
      >
        <AppProvider>
          <main
            className='relative flex min-h-screen flex-col bg-background'
            vaul-drawer-wrapper=''
          >
            <BgAnimationIcons />
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  )
}
