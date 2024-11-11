"use client"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { ChevronsUpDown, Plus, User } from "lucide-react"
import CreateOrganizationModal from "@/components/app/Modals/CreateOrganizationModal"
import { useOrganization } from "@/contexts/OrganizationContext"
import { useOrganizationList } from "@/contexts/OrganizationListContext"
import { useState } from "react"

export default function OrganizationSelect() {
  const { organization, setOrganization } = useOrganization()
  const { organizations } = useOrganizationList()
  const { isMobile } = useSidebar()
  const [open, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {organization ? (
                <User className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {organization
                  ? organization.orgName
                  : organizations.length > 0
                    ? "Select organization"
                    : "Create an organization"}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <>
            {organizations.map((org) => (
              <DropdownMenuCheckboxItem
                key={org.orgId}
                checked={org.orgId === organization.orgId}
                onCheckedChange={() => {
                  setTimeout(() => setOrganization(org), 0)
                }}
              >
                {org.orgName}
              </DropdownMenuCheckboxItem>
            ))}
          </>
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-blue-300">
              <Plus className="h-4 w-4" />
              <p>Create organization</p>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateOrganizationModal close={closeModal} />
    </Dialog>
  )
}
