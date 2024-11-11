'use client'
import { Label } from '@/components/ui/label'
import { useOrganization } from '@/contexts/OrganizationContext'
import ExtensionToggle from '@/components/app/settings/ExtensionToggle'
import { SiGooglesheets } from 'react-icons/si'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import SheetsConfigDialog from '@/components/app/settings/SheetsConfigDialog'

export default function Page() {
  const { organization } = useOrganization()
  const [dialogOpen, setIsDialogOpen] = useState(false)

  return (
    <main className="flex flex-col gap-4 p-4">
      <Label className="text-xl font-bold">
        {organization.orgName}&#39;s Settings
      </Label>
      <div className="flex flex-col gap-4">
        <ExtensionToggle
          label="Google Sheets"
          sublabel="extension"
          description="Manage your group entries."
          icon={SiGooglesheets}
          onChange={(v) => console.log(v)}
          onConfigure={() => setIsDialogOpen(true)}
          checked={false}
          error={true}
        />
      </div>
      <SheetsConfigDialog
        dialogOpen={dialogOpen}
        setIsDialogOpen={(v) => setIsDialogOpen(v)}
      />
    </main>
  )
}
