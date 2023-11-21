"use client"

import { Address, useAccount, useChainId, useContractRead } from "wagmi"

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
    <div className={`flex flex-col gap-2`}>
      <p className="text-2xl font-bold tracking-tighter">Reads</p>
      <div
        className={`flex w-full items-center rounded-md border bg-secondary p-2`}
      >
        <div className={`flex w-full justify-between`}>
          <div className={``}>
            client balanceOf(<span className={``}>{address}</span>
            ):
          </div>
          <div className={``}>
            <span className={``}>{balance?.toString()}</span>
          </div>
        </div>
      </div>
      <div
        className={`flex w-full items-center rounded-md border bg-secondary p-2`}
      >
        <div className={`flex w-full justify-between`}>
          <div className={``}>totalSupply():</div>
          <div className={``}>
            <span className={``}>{totalSupply?.toString()}</span>
          </div>
        </div>
      </div>
      <div
        className={`flex w-full items-center rounded-md border bg-secondary p-2`}
      >
        <div className={`flex w-full justify-between`}>
          <div className={``}>symbol():</div>
          <div className={``}>
            <span className={``}>{symbol?.toString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
