import { Metadata } from 'next'
import defalutMeta from '@/utils/defaultMeta'
import '@/styles/globals.scss'
import Navbar from '@/components/navbar/Navbar'
import Header from '@/components/Header'

export const metadata: Metadata = {
  ...defalutMeta,
  title: 'Budget'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Navbar />
      </body>
    </html>
  )
}
