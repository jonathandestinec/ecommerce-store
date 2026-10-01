'use client'
import * as React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client'

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
    // useState preserves the client across renders/suspensions.
    // Without it, a suspend during initial render would create a second client and drop cached data.
    const [queryClient] = React.useState(() => getQueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}