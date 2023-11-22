"use client"

import { Address, useAccount, useChainId, useContractRead } from "wagmi"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// @ts-ignore
import { WagmiMintExample } from "../../contracts/WagmiMintExample.sol"

export const WagmiReads = () => {
  const chainId = useChainId()

  const { address, isConnected } = useAccount()

  const { data: balance } = useContractRead({
    /**
     * Spreading in a method will spread abi, address and args
     * Hover over balanceOf and click go-to-definition should take you to the method definition in solidity if compiling from solidity
     */
    ...WagmiMintExample.read({ chainId }).balanceOf(address as Address),
    enabled: isConnected,
  })
  const { data: totalSupply } = useContractRead({
    ...WagmiMintExample.read({ chainId }).totalSupply(),
    enabled: isConnected,
  })
  const { data: symbol } = useContractRead({
    ...WagmiMintExample.read({ chainId }).symbol(),
    enabled: isConnected,
  })

  return (
    <section className="flex flex-col gap-2">
      <p className="text-3xl font-bold tracking-tighter">Reads</p>
      <ul className={`flex flex-col gap-2`}>
        <Card>
          <CardHeader>
            <CardTitle>balanceOf</CardTitle>
            <CardDescription>{address}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{balance?.toString()}</p>
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
