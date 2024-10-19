import { Creepster } from 'next/font/google'
import localFont from 'next/font/local'

const creepster = Creepster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-creepster'
})

const geistSans = localFont({
  src: './GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})

const geistMono = localFont({
  src: './GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export { creepster, geistSans, geistMono }
