"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useContractRead } from "wagmi";
import contract from "@/contract/HoldMyWine.json";
import { useEffect } from "react";

export default function Home() {
    const { data, isLoading } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: contract.abi,
        functionName: "uri",
        args: ["0"],
    });
    let img = "";
    useEffect(() => {
        const url = (data as string).replace("{id}", "1");
        fetch(url)
            .then((res) => res.json())
            .then((res) => (img = res.external_url));
    }, [data]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <main>
            hello world <ConnectButton />
            <div>{data as string}</div>
            <Image src={img} width="100" height="100" alt="" />
        </main>
    );
}
