import { Metadata } from 'next'
import defalutMeta from '@/utils/defaultMeta'
import '@/styles/globals.scss'
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
  return (
    <html lang="en">
      <body>
        {children}
        {/* @ts-expect-error Async Server Component */}
        <Navbar />
      </body>
    </html>
  )
}
