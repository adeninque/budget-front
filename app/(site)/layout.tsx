import { Metadata } from 'next'
import defalutMeta from '@/utils/defaultMeta'
import './globals.css'
import fetchUser from '@/utils/fetchUser'

export const metadata: Metadata = {
  ...defalutMeta,
  title: 'Budget'
}

const getUser = async () => {
  const { token } = await fetchUser()
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
