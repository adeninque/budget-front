import { Metadata } from 'next'
import defalutMeta from '@/utils/defaultMeta'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  ...defalutMeta,
  title: 'Budget'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navbar = await Navbar()

  return (
    <html lang="en">
      <body>{children}</body>
      {navbar}
    </html>
  )
}
