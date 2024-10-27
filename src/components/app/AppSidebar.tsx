'use client'
import { Calendar, Home, User } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

export function AppSidebar() {
  const { setOpen, open } = useSidebar()
  const { user } = useUser()
  const [hoverOpen, setHoverOpen] = useState(false)

  useEffect(() => {
    if (open && hoverOpen) {
      setOpen(false)
    }

    if (!open && hoverOpen) {
      setOpen(true)
    }
  }, [hoverOpen])

  const onHover = () => {
    if (open) {
      return
    } else {
      setHoverOpen(true)
    }
  }

  const onLeave = () => {
    if (hoverOpen) {
      setOpen(false)
      setHoverOpen(false)
    } else {
      return
    }
  }

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {user.firstName}
            <SidebarMenuSkeleton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="dashboard">
                <SidebarMenuButton asChild>
                  <a href="/app/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="journal">
                <SidebarMenuButton asChild>
                  <a href="/app/journal">
                    <Calendar />
                    <span>Journal</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="users">
                <SidebarMenuButton asChild>
                  <a href="/app/users">
                    <User />
                    <span>Users</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
