'use client'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Group } from '@/lib/types'
import { useOrganization } from './OrganizationContext'
import { getOrganizationGroups } from '@/lib/api/groups'

interface GroupListContextType {
  groups: Group[]
  addGroup: (group: Group) => void
}

const GroupListContext = createContext<GroupListContextType | undefined>(
  undefined
)

export const GroupListContextProvider = ({ children }: PropsWithChildren) => {
  const [groups, setGroups] = useState<Group[]>([])
  const { organization } = useOrganization()

  const addGroup = (group: Group) => {
    setGroups((prevGroups) => [...prevGroups, group])
  }

  useEffect(() => {
    if (organization) {
      getOrganizationGroups(organization.orgId).then((groups) => {
        setGroups(groups)
      })
    }
  }, [organization])

  return (
    <GroupListContext.Provider
      value={{
        groups,
        addGroup,
      }}
    >
      {children}
    </GroupListContext.Provider>
  )
}

export const useGroupList = () => {
  const context = useContext(GroupListContext)

  if (context === undefined) {
    throw new Error(
      'useGroupList must be used within an GroupListContextProvider'
    )
  }

  return context
}
