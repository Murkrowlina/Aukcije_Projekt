import { Inter, Fira_Sans_Extra_Condensed } from 'next/font/google'
import styles from './globals.css';

const fira = Fira_Sans_Extra_Condensed({
  weight: '400',
  subsets: ['latin']
})
const inter = Inter({
  subsets: ['latin']
})

export const metadata = {
  title: 'Aukcije',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fira.className}>{children}</body>
    </html>
  )
}
