'use client'

import { volkhov } from "@/styles/fonts"

export default function FashionError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="mx-auto grid min-h-64 w-full max-w-7xl place-items-center px-5 py-16 text-center">
      <div>
        <h2 className={`${volkhov.className} text-2xl text-[#484848]`}>Could not load products</h2>
        <p className="mt-2 text-sm text-[#888]">Please check your connection and try again.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-[10px] bg-black px-7 py-3 text-sm text-white shadow-[0_20px_35px_0_rgba(0,0,0,0.15)] transition hover:bg-[#333]"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
