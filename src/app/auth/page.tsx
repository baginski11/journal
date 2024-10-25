"use client"

import {useAuth} from "@/contexts/AuthContext";
import Step1 from "@/components/auth/register/Step1";
import Step2 from "@/components/auth/register/Step2";
import AccountFound from "@/components/auth/register/AccountFound";

export default function  Page() {
    const { authStep } = useAuth();
    return (
        <div className='w-dvw h-dvh flex items-center justify-center flex-col gap-4'>
            {authStep === 1 && <Step1 />}
            {authStep === 2 && <Step2 />}
            {authStep === 3 && <AccountFound />}
        </div>
    );
}