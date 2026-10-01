"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyId } from "@/components/ui/copy-id"
import { useOrdersSummary } from "@/lib/orders-query"
import { useWishlistCount } from "@/lib/wishlist-query"

const input = "h-11 w-full rounded border border-[#ccc] bg-white px-3 text-sm text-[#333] outline-none placeholder:text-[#aaa] focus:border-black"

export function ProfileClient({
  email,
  userId,
  memberSince,
  firstName,
  lastName,
  phone,
}: {
  email: string
  userId: string
  memberSince: string
  firstName: string
  lastName: string
  phone: string
}) {
  const router = useRouter()
  const { count: ordersCount } = useOrdersSummary(userId)
  const { data: wishlistCount } = useWishlistCount(userId)
  const [message, setMessage] = useState("")
  const [busy, setBusy] = useState(false)
  const displayName = `${firstName} ${lastName}`.trim()

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setMessage("")
    const fd = new FormData(e.currentTarget)
    const { error } = await createClient().auth.updateUser({
      data: { first_name: fd.get("firstName"), last_name: fd.get("lastName"), phone: fd.get("phone") },
    })
    setMessage(error ? error.message : "Profile updated.")
    setBusy(false)
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-5 lg:grid-cols-2">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="size-14">
            <AvatarFallback className="text-base">
              {(email.slice(0, 2) || "FA").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="truncate text-base">{displayName || "My account"}</CardTitle>
            <CardDescription className="mt-1 truncate">{email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 border-t border-[#eee] pt-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#8a8a8a]">Member since</span>
            <span className="text-[#484848]">{new Date(memberSince).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="shrink-0 text-[#8a8a8a]">User ID</span>
            <CopyId value={userId} label="User ID" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#8a8a8a]">Orders</span>
            <Link href="/dashboard/orders" className="text-[#484848] underline-offset-4 hover:underline">{ordersCount}</Link>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#8a8a8a]">Wishlist</span>
            <Link href="/dashboard/wishlist" className="text-[#484848] underline-offset-4 hover:underline">{wishlistCount} saved</Link>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-base">Personal details</CardTitle>
          <CardDescription>Only you can see this.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={save} className="grid gap-3">
            <label className="grid gap-1.5 text-xs text-[#484848]">First name<input name="firstName" defaultValue={firstName} className={input} /></label>
            <label className="grid gap-1.5 text-xs text-[#484848]">Last name<input name="lastName" defaultValue={lastName} className={input} /></label>
            <label className="grid gap-1.5 text-xs text-[#484848]">Phone<input name="phone" defaultValue={phone} className={input} /></label>
            <Button disabled={busy} type="submit">{busy ? "Saving…" : "Save changes"}</Button>
            {message && <p role="status" className="text-xs leading-5 text-[#555]">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
