'use server'
import { createClient } from '@/utils/supabase/server'
import { User } from '@/lib/types'
import type { User as AuthUser } from '@supabase/auth-js/src/lib/types'

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  if (error) {
    return null
  } else {
    return data
  }
}

export const createAccount = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
): Promise<User | null> => {
  const client = await createClient()

  const register = await client.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
      },
    },
  })

  if (register.error) {
    return null
  }

  const dbuser = await client
    .from('users')
    .insert({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      userId: register.data.user?.id,
    })
    .select()
    .single()
  if (dbuser.error) {
    await client.auth.admin.deleteUser(register.data.user!.id)
    return null
  }
  return dbuser.data
}

export const signInWithPassword = async (email: string, password: string) => {
  const client = await createClient()

  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  })
  if (error) {
    return null
  }

  return data.user
}

export const getAuthUser = async (): Promise<AuthUser | null> => {
  const client = await createClient()
  const { data, error } = await client.auth.getUser()
  if (error) {
    return null
  }
  return data.user
}
