"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Providers } from "@/app/providers";

export default function ConnectButtonWeb3() {
    return (
        <Providers>
            <ConnectButton />
        </Providers>
    );
}
