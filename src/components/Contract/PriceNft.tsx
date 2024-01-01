"use client";
import React from "react";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { address as WineStockAddress, abi as WineStockAbi } from "@/contract/WineStock";
import { address as HoldMyWineAddress, abi as HoldMyWineAbi } from "@/contract/HoldMyWine";
import { formatEther } from "viem";
import { getNetwork } from "wagmi/actions";

export default function PriceNft({ id }: { id: number }) {
    const {
        data: price,
        isLoading: priceLoading,
        isSuccess: priceSuccess,
    } = useContractRead({
        address: WineStockAddress,
        abi: WineStockAbi,
        functionName: "getWinePrice",
        args: [BigInt(id)],
    });
    const { data: stock } = useContractRead({
        address: HoldMyWineAddress,
        abi: HoldMyWineAbi,
        functionName: "balanceOf",
        args: [WineStockAddress, BigInt(id)],
        watch: true,
    });
    const network = getNetwork();

    const { config } = usePrepareContractWrite({
        address: WineStockAddress,
        abi: WineStockAbi,
        functionName: "buyIdWinesFromStock",
        args: [BigInt(id), BigInt(1)],
        value: price,
    });

    const { write: buyWine } = useContractWrite(config);

    if (priceLoading) return <div>Loading...</div>;
    if (!priceSuccess) return <div>Error, change the network ?</div>;
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-900 font-bold text-lg">
                {network.chain?.nativeCurrency.symbol} {formatEther(price as unknown as bigint)}
            </span>
            {stock ? (
                <span className="text-gray-600 text-sm">stock {stock.toString()}</span>
            ) : (
                <span className="text-gray-600 text-sm">stock 0</span>
            )}
            <button
                className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                disabled={!buyWine}
                onClick={() => (buyWine ? buyWine() : console.log("no write function"))}
            >
                Buy 1
            </button>
        </div>
    );
}
