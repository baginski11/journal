"use client"
import {Label} from "@/components/ui/label";
import {ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import PasswordInputOnLogin from "@/components/auth/PasswordInputOnLogin";
import {useAuth} from "@/contexts/AuthContext";
import {useSwipeBack} from "@/hooks/auth/useSwipeBack";


export default function AccountFound() {
    const { firstName, setAuthStep } = useAuth()

    const onSwipeBack = () => {
        setAuthStep(1)
    }
    useSwipeBack({onSwipeBack})


    return(
        <div className='flex flex-col gap-12 m-8'>
            <div className='flex flex-col sm:gap-3 gap-2'>
                <Label className='font-semibold sm:text-sm md:text-xl'>Hi, {firstName}</Label>
                <Label className='text-muted-foreground font-medium sm:text-xs md:text-md lg:text-base '>Please enter your password to log in.</Label>
            </div>

            <div className='flex flex-col gap-5'>

                <PasswordInputOnLogin/>
                <Button variant="outline" className='font-medium w-full max-w-44'>
                    Continue
                    <ChevronRight className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
            </div>

        </div>
    )
}