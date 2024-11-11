"use server"

import { Meeting } from "@/lib/types"
import { createClient } from "@/utils/supabase/server"

export const createMeeting = async (
  meeting: Meeting
): Promise<Meeting | null> => {
  const client = await createClient()

  const { data, error } = await client.from("meetings").insert(meeting).single()

  if (error) {
    return null
  }

  return data as unknown as Meeting
}

export const getMeeting = async (
  meetingId: string
): Promise<Meeting | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from("meetings")
    .select("*")
    .eq("meetingId", meetingId)
    .limit(1)
    .single()

  if (error) {
    return null
  }

  return data as unknown as Meeting
}

export const getGroupMeetings = async (
  groupId: string
): Promise<Meeting[] | null> => {
  const client = await createClient()

  const { data, error } = await client
    .from("meetings")
    .select("*")
    .eq("groupId", groupId)

  if (error) {
    return []
  }

  return data as unknown as Meeting[]
}

export const updateMeeting = async (
  meeting: Meeting
): Promise<Meeting | null> => {
  const client = await createClient()

  const { data, error } = await client.from("meetings").upsert(meeting).single()

  if (error) {
    return null
  }

  return data as unknown as Meeting
}
