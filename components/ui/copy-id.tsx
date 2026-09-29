"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

function shortId(value: string) {
  const clean = String(value ?? "")
  if (clean.length <= 16) return clean
  return `${clean.slice(0, 6)}...${clean.slice(-4)}`
}

export function CopyId({
  value,
  label = "ID",
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const display = shortId(value)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const el = document.createElement("textarea")
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <span className={cn("inline-flex min-w-0 max-w-full items-center gap-1", className)}>
      <span title={value} aria-label={`${label}: ${value}`} className="min-w-0 truncate font-mono text-xs text-[#484848]">
        {display}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy full ${label}`}
        title={copied ? "Copied" : `Copy full ${label}`}
        className="grid size-6 shrink-0 place-items-center rounded-full text-[#8a8a8a] transition hover:bg-[#f6f6f6] hover:text-black"
      >
        {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      </button>
      <span role="status" className="sr-only">{copied ? "Copied" : ""}</span>
    </span>
  )
}
