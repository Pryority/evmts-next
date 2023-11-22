"use client"

import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WagmiReads } from "@/components/wagmi/WagmiReads"
import { WagmiWrites } from "@/components/wagmi/WagmiWrites"

export default function FunctionList() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <section className="grid grid-cols-2 gap-8">
      {mounted && (
        <>
          <WagmiReads />
          <WagmiWrites />
        </>
      )}
      {!mounted && <LoadingSkeleton />}
    </section>
  )
}

const LoadingSkeleton = () => (
  <>
    <section className="flex flex-col gap-2">
      <p className="text-3xl font-bold tracking-tighter">Reads</p>
      <ul className={`flex flex-col gap-2`}>
        <Card className="h-[104px]">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p> </p>
          </CardContent>
        </Card>
        <Card className="h-[104px]">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p> </p>
          </CardContent>
        </Card>
        <Card className="h-[104px]">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p> </p>
          </CardContent>
        </Card>
      </ul>
    </section>
    <section className="flex flex-col gap-2">
      <p className="text-3xl font-bold tracking-tighter">Writes</p>
      <ul className={`flex flex-col gap-2`}>
        <Card className="h-[104px]">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p> </p>
          </CardContent>
        </Card>
      </ul>
    </section>
  </>
)
