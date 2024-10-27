'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PhoneNumberInput from '@/components/auth/PhoneNumberInput'
import PasswordInput from '@/components/auth/PasswordInput'
import { useAuth } from '@/contexts/AuthContext'
import { useSwipeBack } from '@/hooks/auth/useSwipeBack'
import { createAccount } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function Step2() {
  const {
    password: pass,
    isEligible,
    setIsEligible,
    phoneNumber,
    setAuthStep,
    setFirstName,
    setLastName,
    firstName,
    lastName,
    email,
  } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const onSwipeBack = () => {
    setAuthStep(1)
  }

  useSwipeBack({ onSwipeBack })

  const onSubmit = async () => {
    setIsEligible(false)

    if (
      phoneNumber.length > 8 &&
      firstName.length > 1 &&
      lastName.length > 1 &&
      pass.length > 8
    ) {
      const res = await createAccount(
        email,
        pass,
        firstName,
        lastName,
        phoneNumber
      )

      if (!res) {
        setIsEligible(true)
        toast({
          variant: 'destructive',
          title: 'Oops!',
          description: 'Something went wrong, please try again later.',
        })
      } else {
        router.push('/app')
      }
    }
  }

  return (
    <div className="m-8 flex flex-col gap-12">
      <div className="flex flex-col gap-2 sm:gap-3">
        <Label className="font-semibold sm:text-sm md:text-xl">
          Let{'&apos'}s get to know eachother
        </Label>
        <Label className="md:text-md font-medium text-muted-foreground sm:text-xs lg:text-base">
          We will need a little more information about you.
        </Label>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex max-w-72 gap-2">
          <div>
            <Label htmlFor="input-firstname">First Name</Label>
            <Input
              id="input-firstname"
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(v) => setFirstName(v.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="input-lastname">Last Name</Label>
            <Input
              id="input-lastname"
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(v) => setLastName(v.target.value)}
            />
          </div>
        </div>

        <div className="max-w-72 space-y-2">
          <PhoneNumberInput />

          <PasswordInput />
        </div>
        <Button
          onClick={onSubmit}
          disabled={!isEligible}
          variant="outline"
          className="w-full max-w-44 font-medium"
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
