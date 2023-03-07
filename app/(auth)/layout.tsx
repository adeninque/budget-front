import defalutMeta from "@/utils/defaultMeta"
import '@/styles/globals.scss'

export const metadata = {
  ...defalutMeta,
  title: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
