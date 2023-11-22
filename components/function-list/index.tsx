"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"
import { WagmiReads } from "@/components/wagmi/WagmiReads"
import { WagmiWrites } from "@/components/wagmi/WagmiWrites"

export default function FunctionList() {
  const [mounted, setMounted] = useState(false)
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    while (!mounted) {
      const interval = setInterval(() => {
        setProgressValue((prevValue) => {
          const newValue = prevValue + 90
          return newValue <= 100 ? newValue : 100
        })
      }, 0)

      // Simulate a delay for demonstration purposes
      const delay = setTimeout(() => {
        setMounted(true)
        clearInterval(interval)
        clearTimeout(delay)
      }, 50) // Adjust the delay as needed

      return () => {
        clearInterval(interval)
        clearTimeout(delay)
      }
    }
  }, [mounted])

  if (!mounted) {
    return <Progress value={progressValue} />
  }

  return (
    <section className="grid grid-cols-2 gap-8">
      <WagmiReads />
      <WagmiWrites />
    </section>
  )
}
