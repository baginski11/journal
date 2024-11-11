'use client'
import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { Organization } from '@/lib/types'

// Define the shape of the auth context state
interface OrganizationContextType {
  organization: Organization
  setOrganization: (organization: Organization) => void
}

// Create the context with default values
const OrganizationContext = createContext<OrganizationContextType>(
  {} as OrganizationContextType
)

// Create the provider component
export const OrganiztionContextProvider = ({
  children,
  organization: organizationProps,
}: PropsWithChildren<Omit<OrganizationContextType, 'setOrganization'>>) => {
  const [organization, setOrganization] =
    useState<Organization>(organizationProps)

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        setOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useOrganization = () => {
  const context = useContext(OrganizationContext)

  if (context === undefined) {
    throw new Error(
      'useOrganization must be used within an OrganizationContextProvider'
    )
  }

  return context
}
