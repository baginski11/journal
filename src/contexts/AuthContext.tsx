'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

// Define the shape of the auth context state
interface AuthContextType {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  authStep: number
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setPhoneNumber: (phoneNumber: string) => void
  setAuthStep: (authStep: number) => void
  isEligible: boolean
  setIsEligible: (isEligible: boolean) => void
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [authStep, setAuthStep] = useState<number>(1)
  const [isEligible, setIsEligible] = useState<boolean>(false)

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        authStep,
        setEmail,
        setPassword,
        setFirstName,
        setLastName,
        setPhoneNumber,
        setAuthStep,
        isEligible,
        setIsEligible,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
