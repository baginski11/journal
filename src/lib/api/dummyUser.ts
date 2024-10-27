'use server'

import { createClient } from '@/utils/supabase/server'
import { DummyUser } from '@/lib/types'

export const getOrganizationDummyUsers = async (
  orgId: string
): Promise<DummyUser[]> => {
  const client = await createClient()

  const { data, error } = await client
    .from('dummyUsers')
    .select('*')
    .eq('dummyUserOrgId', orgId)

  if (error) {
    return []
  }

  return data as DummyUser[]
}

export const getGroupDummyUsers = async (
  groupId: string
): Promise<DummyUser[]> => {
  const client = await createClient()

  const { data, error } = await client.from('dummyUsers').select('*')

  if (error) {
    return []
  }

  const dummyUsers: DummyUser[] = data as DummyUser[]

  const filteredData = dummyUsers?.filter((user: DummyUser) =>
    user.dummyGroupsIds.includes(groupId)
  )

  return filteredData as DummyUser[]
}

export const createDummyUser = async (
  dummyUser: DummyUser
): Promise<DummyUser | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from('dummyUsers')
    .insert([dummyUser])
    .single()

  if (error) {
    return null
  }

  return data as DummyUser
}

export const deleteDummyUser = async (dummyUserId: string) => {
  const client = await createClient()

  const { error } = await client
    .from('dummyUsers')
    .delete()
    .eq('id', dummyUserId)

  return !error
}
