"use client"

import { Suspense, useEffect, useState } from "react"

import { WagmiReads } from "@/components/wagmi/WagmiReads"
import { WagmiWrites } from "@/components/wagmi/WagmiWrites"

const LoadingFallback = () => (
  <div className={``}>
    <div>Loading...</div>
  </div>
)

export default function FunctionList() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <Suspense fallback={<LoadingFallback />}>
      {mounted && (
        <section className="grid grid-cols-2 gap-8">
          <WagmiReads />
          <WagmiWrites />
        </section>
      )}
    </Suspense>
  )
}
