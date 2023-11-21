"use client"

import { Suspense, useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const LoadingFallback = () => (
  <div className={``}>
    <div>Loading...</div>
  </div>
)

export const ChainConnectButton = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <Suspense fallback={<LoadingFallback />}>
      {mounted && (
        <>
          <ConnectButton />
        </>
      )}
    </Suspense>
  )
}
