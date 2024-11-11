import { Button } from '@/components/ui/button'
import { SiGooglesheets } from 'react-icons/si'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

export default function SheetsConfigDialogGeneral() {
  const connected = false
  const isLoading = true

  return (
    <div className="flex flex-col gap-2 p-3">
      <h1 className="text-xl font-bold">General</h1>

      <Button
        size="default"
        variant="outline"
        className={cn(
          'w-fit gap-2',
          connected
            ? 'text-green-400 hover:text-green-500'
            : 'text-destructive hover:text-destructive'
        )}
      >
        <SiGooglesheets className="h-4 w-4" />
        <span className="font-medium">
          {connected ? 'Connected' : 'Connect'}
        </span>
        <LoaderCircle className="h-4 w-4 animate-spin ease-in-out" />
      </Button>
    </div>
  )
}
