"use client"

import { WagmiMintExample } from "@/contracts/WagmiMintExample.sol"
import { Address, useAccount, useChainId, useContractRead } from "wagmi"

import { addresses } from "@/lib/addresses"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const WagmiReads = () => {
  const { address, isConnected } = useAccount()

  const chainId = useChainId()

  const { data: balance } = useContractRead({
    /**
     * Spreading in a method will spread abi, address and args
     * Hover over balanceOf and click go-to-definition should take you to the method definition in solidity if compiling from solidity
     */
    ...WagmiMintExample.read.balanceOf(address as Address),
    enabled: isConnected,
  })
  const { data: totalSupply } = useContractRead({
    ...WagmiMintExample.read.totalSupply(),
    address: addresses[WagmiMintExample.name][chainId as 1],
    onError: console.error,
  })
  const { data: symbol } = useContractRead({
    ...WagmiMintExample.read.symbol(),
    address: addresses[WagmiMintExample.name][chainId as 1],
    onError: console.error,
  })

  return (
    <section className="flex flex-col gap-2">
      <p className="text-3xl font-bold tracking-tighter">Reads</p>
      <ul className={`flex flex-col gap-2`}>
        <Card>
          <CardHeader>
            <CardTitle>balanceOf</CardTitle>
            <CardDescription>
              {address ? address : "Required: Connection"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{balance ? balance?.toString() : "Required: Connection"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>totalSupply</CardTitle>
            <CardDescription>WagmiMintExample</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{totalSupply?.toString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>symbol</CardTitle>
            <CardDescription>ERC721 Ticker</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{symbol?.toString()}</p>
          </CardContent>
        </Card>
      </ul>
    </section>
  )
}
