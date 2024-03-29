"use client";

import * as React from "react";
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { argentWallet, trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora, goerli, localhost, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        polygon,
        polygonMumbai,
        localhost,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
    ],
    [publicProvider()]
);

const projectId = "3e25ee4a6a4610ffed15bc4dbcadcba9";

const { wallets } = getDefaultWallets({
    appName: "RainbowKit demo",
    projectId,
    chains,
});

const demoAppInfo = {
    appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: "Other",
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
