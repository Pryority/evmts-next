"use client"

import {
  Address,
  useAccount,
  useChainId,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi"

import { cn } from "@/lib/utils/cn"
import { getRandomInt } from "@/lib/utils/getRandomInt"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { WagmiMintExample } from "@/contracts/WagmiMintExample.sol"
import { addresses } from "@/lib/addresses"

export const WagmiWrites = () => {
  const { address, isConnected } = useAccount()

  const chainId = useChainId()

  const { data, refetch } = useContractRead({
    /**
     * Spreading in a method will spread abi, address and args
     * Hover over balanceOf and click go-to-definition should take you to the method definition in solidity if compiling from solidity
     */
    ...WagmiMintExample.read.balanceOf(address as Address),
    address: addresses[WagmiMintExample.name][chainId as 1],
    enabled: isConnected,
  })

  const { writeAsync: writeMint, data: mintData } = useContractWrite({
    /**
     * Not calling the function will return abi and address without args
     * This is useful for when you want to lazily call the function like in case of useContractWrite
     */
    ...WagmiMintExample.write.mint,
    address: addresses[WagmiMintExample.name][chainId as 1],
  })

  useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess: (receipt) => {
      console.log("minted", receipt)
      refetch()
    },
  })

  return (
    <section className="flex flex-col gap-2">
      <p className="text-3xl font-bold tracking-tighter">Writes</p>
      <ul className={`flex flex-col gap-2`}>
        <Card>
          <CardHeader>
            <CardTitle>balanceOf</CardTitle>
            <CardDescription>
              {address ? address : "Required: Connection"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data ? data?.toString() : "Required: Connection"}</p>
          </CardContent>
          <CardFooter className="w-full justify-end">
            <Button
              type="button"
              variant={"outline"}
              className={cn(
                "border-2 border-primary bg-secondary text-primary invert hover:bg-secondary/80"
              )}
              onClick={() =>
                writeMint(
                  WagmiMintExample.write.mint(BigInt(getRandomInt())),
                )
              }
            >
              Mint
            </Button>
          </CardFooter>
        </Card>
      </ul>
    </section>
  )
}
