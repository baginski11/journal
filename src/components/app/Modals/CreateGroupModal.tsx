'use client'
import {
    Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createOrganization } from '@/lib/api/organization'
import { LoaderCircle, Plus } from 'lucide-react'
import { useOrganization } from '@/contexts/OrganizationContext'
import { useOrganizationList } from '@/contexts/OrganizationListContext'
import { useGroupList } from '@/contexts/GroupListContext'
import { createGroup } from '@/lib/api/groups'
import { DialogTrigger } from '@radix-ui/react-dialog'



export default function CreateGroupModal() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { groups, addGroup } = useGroupList()
  const { organization } = useOrganization()
  const [open , setOpen] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    if (name.length < 3) {
      setLoading(false)
      setError('Group name must be at least 3 characters long.')

      return
    }

    const res = await createGroup(name, organization.orgId)

    if (res) {
      setLoading(false)
      setOpen(false)
    addGroup(res)

    } else {
      setLoading(false)
      setError('An error occurred while creating the group.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogTrigger asChild>
            <Button size='icon' variant='ghost'>
                <Plus className='h-4 w-4'/>
            </Button>
        </DialogTrigger>
  
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new group</DialogTitle>
        <DialogDescription>
          The group will be created in {organization.orgName} Organization
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <Label htmlFor="input-groupname">Group name</Label>
        <Input
          id="input-groupname"
          value={name}
          onChange={(v) => setName(v.target.value)}
          className="peer pe-9"
          placeholder="Example name"
          type="text"
        />
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
      <DialogFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}
