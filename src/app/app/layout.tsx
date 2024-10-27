import { PropsWithChildren } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app/AppSidebar'
import { UserContextProvider } from '@/contexts/UserContext'
import { getAuthUser } from '@/lib/api/auth'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/api/user'

export default async function Layout({ children }: PropsWithChildren) {
  const authUser = await getAuthUser()

  if (!authUser) {
    return redirect('/auth')
  }

  const user = await getUser(authUser.id)

  if (!user) {
    return redirect('/auth')
  }

  return (
    <UserContextProvider user={user}>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </UserContextProvider>
  )
}
