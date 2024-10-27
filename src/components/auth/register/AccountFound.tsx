'use client'
import { Label } from '@/components/ui/label'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PasswordInputOnLogin from '@/components/auth/PasswordInputOnLogin'
import { useAuth } from '@/contexts/AuthContext'
import { useSwipeBack } from '@/hooks/auth/useSwipeBack'
import { signInWithPassword } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function AccountFound() {
  const { firstName, setAuthStep, email, password, setPassword } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const onSwipeBack = () => {
    setAuthStep(1)
  }

  useSwipeBack({ onSwipeBack })

  const onContinue = async () => {
    const res = await signInWithPassword(email, password)

    if (res) {
      router.push('/app')
    } else {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Invalid password. Please try again.',
      })
      setPassword('')
    }
  }

  return (
    <div className="m-8 flex flex-col gap-12">
      <div className="flex flex-col gap-2 sm:gap-3">
        <Label className="font-semibold sm:text-sm md:text-xl">
          Hi, {firstName}
        </Label>
        <Label className="md:text-md font-medium text-muted-foreground sm:text-xs lg:text-base">
          Please enter your password to log in.
        </Label>
      </div>

      <div className="flex flex-col gap-5">
        <PasswordInputOnLogin />
        <Button
          variant="outline"
          className="w-full max-w-44 font-medium"
          onClick={onContinue}
        >
          Continue
          <ChevronRight
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}
