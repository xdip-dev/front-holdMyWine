import React from "react";
import { nftMetadata } from "@/data/nft/data";
import NftItemBox from "./nft-item-box";

const NftItemArea = () => {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {nftMetadata.slice(0, 3).map((item) => (
                        <div key={item.id}>
                            <NftItemBox item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NftItemArea;
// tailwind
