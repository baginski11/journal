'use server'
import { createClient } from '@/utils/supabase/server'
import { Group } from '@/lib/types'

export const getOrganizationGroups = async (orgId: string) => {
  const client = await createClient()

  const { data, error } = await client
    .from('groups')
    .select('*')
    .eq('groupOrgId', orgId)

  if (error) {
    return []
  }

  return data as Group[]
}

export const getGroupDetails = async (groupId: string) => {
  const client = await createClient()

  const { data, error } = await client
    .from('groups')
    .select('*')
    .eq('groupId', groupId)
    .single()

  if (error) {
    return null
  }

  return data as Group
}

export const createGroup = async (group: Group) => {
  const client = await createClient()

  const { data, error } = await client.from('groups').insert([group]).single()

  if (error) {
    return null
  }

  return data as Group
}

export const updateGroup = async (group: Group) => {
  const client = await createClient()

  const { data, error } = await client
    .from('groups')
    .update(group)
    .eq('groupId', group.groupId)
    .single()

  if (error) {
    return null
  }

  return data as Group
}

export const deleteGroup = async (groupId: string) => {
  const client = await createClient()

  const { error } = await client.from('groups').delete().eq('groupId', groupId)

  if (error) {
    return null
  }

  return groupId
}
