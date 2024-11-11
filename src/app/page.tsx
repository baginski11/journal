import { getAuthUser } from "@/lib/api/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const authUser = await getAuthUser()

  if (!authUser) {
    return redirect("/auth")
  } else {
    return redirect("/app")
  }
}
