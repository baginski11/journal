import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
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
  SidebarProvider,
} from '@/components/ui/sidebar'
import { useGroupList } from '@/contexts/GroupListContext'
import SheetsConfigDialogGeneral from '@/components/app/settings/SheetsConfigDialogGeneral'

interface SheetsConfigDialogProps {
  dialogOpen: boolean
  setIsDialogOpen: (v: boolean) => void
}

export default function SheetsConfigDialog(props: SheetsConfigDialogProps) {
  const { dialogOpen, setIsDialogOpen } = props
  const { groups } = useGroupList()

  return (
    <Dialog open={dialogOpen} onOpenChange={(v) => setIsDialogOpen(v)}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Configuration</DialogTitle>
        <DialogDescription className="sr-only">
          Configure your Google Sheets extension.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem key="general">
                  <SidebarMenuButton asChild isActive>
                    <a href="#">
                      <span className="text-md font-medium">General</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Groups</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <>
                      {groups.map((item) => (
                        <SidebarMenuItem key={item.groupName}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.groupName === 'Messages & media'}
                          >
                            <a href="#">
                              <span>{item.groupName}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <SheetsConfigDialogGeneral />
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
