"use server"

import { createClient } from "@/utils/supabase/server"
import { Record } from "@/lib/types"

export const getMeetingRecords = async (
  meetingId: string
): Promise<Record[] | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from("records")
    .select("*")
    .eq("meetingId", meetingId)

  if (error) {
    return []
  }

  return data as unknown as Record[]
}

export const getRecord = async (recordId: string): Promise<Record | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from("records")
    .select("*")
    .eq("recordId", recordId)
    .limit(1)
    .single()

  if (error) {
    return null
  }

  return data as unknown as Record
}

export const createRecord = async (record: Record): Promise<Record | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from("records")
    .insert(record)
    .select()
    .single()

  if (error) {
    return null
  }

  return data as unknown as Record
}

export const updateRecord = async (record: Record): Promise<Record | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from("records")
    .update(record)
    .eq("recordId", record.recordId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data as unknown as Record
}

export const deleteRecord = async (recordId: string): Promise<boolean> => {
  const client = await createClient()

  const { error } = await client
    .from("records")
    .delete()
    .eq("recordId", recordId)

  return !error
}
