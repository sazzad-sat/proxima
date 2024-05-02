import { UserButton, SignedIn } from '@clerk/nextjs'

export default function Sidebar() {
  return (
    <aside className="max-w-sm w-screen bg-neutral-200">
      <div className="w-full p-4">
        <SignedIn>
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: {
                  flexFlow: 'row-reverse',
                },
              },
            }}
          />
        </SignedIn>
      </div>
    </aside>
  )
}
