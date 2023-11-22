"use client"

import { WagmiReads } from "@/components/wagmi/WagmiReads"
import { WagmiWrites } from "@/components/wagmi/WagmiWrites"

export default function FunctionList() {
  return (
    <section className="grid grid-cols-2 gap-8">
      <WagmiReads />
      <WagmiWrites />
    </section>
  )
}
