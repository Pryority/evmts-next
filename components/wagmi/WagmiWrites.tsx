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

import { WagmiMintExample } from "../../contracts/WagmiMintExample.sol"

export const WagmiWrites = () => {
  const chainId = useChainId()

  const { address, isConnected } = useAccount()

  const { data, refetch } = useContractRead({
    /**
     * Spreading in a method will spread abi, address and args
     * Hover over balanceOf and click go-to-definition should take you to the method definition in solidity if compiling from solidity
     */
    ...WagmiMintExample.read({ chainId }).balanceOf(address as Address),
    enabled: isConnected,
  })

  const { writeAsync: writeMint, data: mintData } = useContractWrite({
    /**
     * Not calling the function will return abi and address without args
     * This is useful for when you want to lazily call the function like in case of useContractWrite
     */
    ...WagmiMintExample.write({ chainId }).mint,
  })

  useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess: (receipt) => {
      console.log("minted", receipt)
      refetch()
    },
  })

  return (
    <div className={`flex flex-col gap-2`}>
      <p className="text-2xl font-bold tracking-tighter">Writes</p>
      <div
        className={`flex w-full items-center rounded-md border bg-secondary p-2`}
      >
        <div className={`flex w-full justify-between`}>
          <div>balance: {data?.toString()}</div>
        </div>
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "border border-stone-700 bg-stone-500 text-white hover:bg-stone-400"
          )}
          onClick={() =>
            writeMint(
              WagmiMintExample.write({ chainId }).mint(BigInt(getRandomInt()))
            )
          }
        >
          Mint
        </Button>
      </div>
    </div>
  )
}
