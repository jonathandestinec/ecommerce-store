"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SettingsClient() {
  const router = useRouter()
  const { signOut: signOutAndClearCache } = useAuth()

  async function signOut() {
    // Central sign-out also clears the TanStack cache (see auth-provider).
    await signOutAndClearCache()
    router.push("/")
    router.refresh()
  }

  return (
    <Card className="max-w-xl bg-white">
      <CardHeader>
        <CardTitle className="text-base">Session</CardTitle>
        <CardDescription>Sign out on this device.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={signOut}>
          <LogOut /> Sign out
        </Button>
      </CardContent>
    </Card>
  )
}
