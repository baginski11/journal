'use server'

import { createClient } from '@/utils/supabase/server'
import { Organization } from '@/lib/types'

export const getUserOrganizations = async (
  ownerId: string
): Promise<Organization[]> => {
  const client = await createClient()

  const { data, error } = await client
    .from('organizations')
    .select('*')
    .eq('orgOwnerId', ownerId)

  if (error) {
    return []
  }

  return data as Organization[]
}

export const getOrganizationDetails = async (
  orgId: string
): Promise<Organization | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from('organizations')
    .select('*')
    .eq('id', orgId)
    .single()

  if (error) {
    return null
  }

  return data as Organization
}

export const createOrganization = async (
  org: Organization
): Promise<Organization | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from('organizations')
    .insert([org])
    .single()

  if (error) {
    return null
  }

  return data as Organization
}

export const updateOrganization = async (
  org: Organization
): Promise<Organization | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from('organizations')
    .update(org)
    .eq('id', org.orgId)
    .single()

  if (error) {
    return null
  }

  return data as Organization
}

export const deleteOrganization = async (orgId: string): Promise<boolean> => {
  const client = await createClient()

  const { error } = await client.from('organizations').delete().eq('id', orgId)

  return !error
}
