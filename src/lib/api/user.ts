'use server'

import { createClient } from '@/utils/supabase/server'
import { User } from '@/lib/types'

export const getUser = async (userId: string): Promise<User | null> => {
  const client = await createClient()
  const { data: user, error } = await client
    .from('users')
    .select('*')
    .eq('userId', userId)
    .single()

  if (error) {
    return null
  }

  return user as User
}
