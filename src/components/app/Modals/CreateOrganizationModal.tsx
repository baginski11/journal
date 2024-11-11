"use client"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createOrganization } from "@/lib/api/organization"
import { LoaderCircle } from "lucide-react"
import { useOrganization } from "@/contexts/OrganizationContext"
import { useOrganizationList } from "@/contexts/OrganizationListContext"

interface Props {
  close: () => void
}

export default function CreateOrganizationModal(props: Props) {
  const { close } = props
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { setOrganization } = useOrganization()
  const { addOrganization } = useOrganizationList()

  const onSubmit = async () => {
    setLoading(true)

    if (name.length < 3) {
      setLoading(false)
      setError("Organization name must be at least 3 characters long.")

      return
    }

    const res = await createOrganization(name, "")

    if (res) {
      setLoading(false)
      addOrganization(res)
      setOrganization(res)
      close()
    } else {
      setLoading(false)
      setError("An error occurred while creating the organization.")
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new organization</DialogTitle>
        <DialogDescription>
          Please enter the details of your new organization.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <Label htmlFor="input-orgname">Organization name</Label>
        <Input
          id="input-orgname"
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
  )
}
