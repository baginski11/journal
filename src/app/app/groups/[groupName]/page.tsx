"use client"
import { useGroupList } from "@/contexts/GroupListContext"
import { getGroupDetails } from "@/lib/api/groups"
import { Group } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function Page({
    params,
  }: {
    params: Promise<{ groupName: string }>
  }) {
    const { groups } = useGroupList()
    const router = useRouter()
    const [groupDetails, setGroupDetails] = useState<Group>()



    useEffect(() => {
        if(groups.length > 0) {
            params.then( async (pa) => {
                console.log(pa)
                console.log(groups)
                const group = groups.find((group) => group.groupName === decodeURIComponent(pa.groupName));
                console.log(group)
                if (group) {
                    const data = await getGroupDetails(group.groupId)
                    if(data) {
                        setGroupDetails(data)
                    }
                } else {
                    router.push('/app')
                }
            })
        }
        
    }, [params, groups])



    return (
        <h1>{groupDetails?.groupName}</h1>
    )
}