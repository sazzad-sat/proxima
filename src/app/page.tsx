import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Route from '@/configs/routes'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { userId } = auth()

  if (userId) redirect(Route.Inbox)

  return (
    <main
      className="flex flex-col gap-8 min-h-screen w-full justify-center items-center"
      style={{
        background: `
        radial-gradient(circle at 37% 40%, violet 0%, transparent 15%),
        radial-gradient(circle at 55% 55%, lightblue 0%, transparent 20%),
        radial-gradient(circle at 43% 60%, rgba(29%, 0%, 51%, .5) 0%, transparent 15%),
        radial-gradient(circle at 60% 35%, yellow 0%, transparent 20%)
      `,
        backgroundSize: '50% 50%',
        backgroundPosition: '50% 50%',
      }}
    >
      <h1 className="text-9xl font-bold">Proxima</h1>

      <div className="flex gap-4">
        <SignUpButton mode="modal">
          <Button>Sign Up</Button>
        </SignUpButton>

        <SignInButton mode="modal">
          <Button variant={'outline'}>Sign In</Button>
        </SignInButton>
      </div>
    </main>
  )
}
