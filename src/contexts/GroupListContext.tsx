'use client'
import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { Group } from '@/lib/types'

interface GroupListContextType {
  groups: Group[]
  addGroup: (group: Group) => void
}

const GroupListContext = createContext<GroupListContextType>(
  [] as GroupListContextType
)

export const GroupListContextProvider = ({
  children,
  groups: groupsProps,
}: PropsWithChildren<Omit<GroupListContextType, 'addGroup'>>) => {
  const [groups, setGroups] = useState<Group[]>(groupsProps)

  const addGroup = (group: Group) => {
    setGroups((prevGroups) => [...prevGroups, group])
  }

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
