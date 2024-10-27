'use client'
import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { Organization } from '@/lib/types'

// Define the shape of the auth context state
interface OrganizationListContextType {
  organizations: Organization[]
  addOrganization: (organization: Organization) => void
}

// Create the context with default values
const OrganizationListContext = createContext<
  OrganizationListContextType | undefined
>(undefined)

// Create the provider component
export const OrganizationListContextProvider = ({
  children,
  organizations: organizationsProps,
}: PropsWithChildren<Omit<OrganizationListContextType, 'addOrganization'>>) => {
  const [organizations, setOrganizations] =
    useState<Organization[]>(organizationsProps)

  const addOrganization = (organization: Organization) => {
    setOrganizations((prevOrganizations) => [
      ...prevOrganizations,
      organization,
    ])
  }

  return (
    <OrganizationListContext.Provider
      value={{
        organizations,
        addOrganization,
      }}
    >
      {children}
    </OrganizationListContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useOrganizationList = () => {
  const context = useContext(OrganizationListContext)

  if (context === undefined) {
    throw new Error(
      'useOrganizationList must be used within an OrganizationListContextProvider'
    )
  }

  return context
}
