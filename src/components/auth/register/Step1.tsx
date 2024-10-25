"use client"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ChevronRight, Mail} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {findUserByEmail} from "@/lib/api/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export default function Step1() {
    const {setEmail, email, setAuthStep, setFirstName} = useAuth()
    const [error, setError] = useState<string | null>(null);
    const onSubmit = async () => {
        if(!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return
        }
        setError(null);


        const user = await findUserByEmail(email);
        if (user) {
            setFirstName(user.firstName)
            setAuthStep(3);
        } else {
            setAuthStep(2);
        }
    }
    return(
        <div className='flex flex-col gap-12 m-8'>
            <div className='flex flex-col sm:gap-3 gap-2'>
                <Label className='font-semibold sm:text-sm md:text-xl'>Welcome Back!</Label>
                <Label className='text-muted-foreground font-medium sm:text-xs md:text-md lg:text-base '>Please enter your credentials to log in or register.</Label>
            </div>

            <div className='flex flex-col gap-5'>

            <div className="space-y-2 max-w-72">
                <Label htmlFor="input-10">Email adress</Label>
                <div className="relative">
                    <Input id="input-10" value={email} onChange={(v) => setEmail(v.target.value)} className="peer pe-9" placeholder="Email" type="email" />
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <Mail size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                </div>
                <p className={`text-destructive text-sm ${error ? "block" : "hidden"}`}>Please enter a valid email adress.</p>

            </div>
            <Button onClick={onSubmit} variant="outline" className='font-medium w-full max-w-44'>
                Continue
                <ChevronRight className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
            </div>

        </div>
    )
}