import Sidebar from '@/layouts/Sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr]">
      <Sidebar />

      {children}
    </div>
  )
}
