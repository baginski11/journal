'use client'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { LucideIcon, TriangleAlert } from 'lucide-react'
import { IconType } from 'react-icons'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ExtensionToggleProps {
  label: string
  sublabel: string
  description: string
  icon: React.ReactNode | LucideIcon | IconType
  onChange: (checked: boolean) => void
  onConfigure: () => void
  checked: boolean
  error?: boolean
}

export default function ExtensionToggle(props: ExtensionToggleProps) {
  const {
    label,
    sublabel,
    description,
    icon: Icon,
    onChange,
    checked,
    onConfigure,
    error = false,
  } = props
  const [open, setIsOpen] = useState(checked)

  const onSwitchToggle = (v) => {
    setIsOpen(v)
    onChange(v)
  }

  return (
    <div className="relative flex w-full flex-col items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state-checked]]:border-ring">
      <div className="flex w-full items-start gap-2">
        <Switch
          id={`switch-${label}`}
          className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
          aria-describedby="switch-17-description"
          onCheckedChange={onSwitchToggle}
          checked={open}
        />
        <div className="flex grow items-center gap-3">
          <Icon className="h-4 w-4" />
          <div className="grid grow gap-2">
            <Label htmlFor={`switch-${label}`}>
              {label}
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                ({sublabel})
              </span>
            </Label>
            <p
              id={`switch-${label}-description`}
              className="text-xs text-muted-foreground"
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {open && (
        <div className="relative z-10 w-full">
          <Button
            size="sm"
            onClick={onConfigure}
            variant="outline"
            className="w-full"
          >
            Configure
          </Button>
        </div>
      )}
      {error && open && (
        <div className="flex flex-row items-center gap-2 text-destructive">
          <TriangleAlert className="h-3 w-3" />
          <p className="text-xs font-medium">Action needed</p>
        </div>
      )}
    </div>
  )
}
