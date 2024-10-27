'use client'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
} from 'react'
import { User } from '@/lib/types'

// Define the shape of the auth context state
interface UserContextType {
  user: User
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined)

// Create the provider component
export const UserContextProvider = ({
  children,
  user: userProps,
}: PropsWithChildren<UserContextType>) => {
  const [user, setUser] = useState<User>(userProps)

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within an UserContextProvider')
  }
  return context
}
