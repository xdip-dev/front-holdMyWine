import React from "react";
import { mapperIdPhoto, ipfsGateway, NftMetadata } from "@/data/nft/data";
import aile from "@/assets/img/nft/ailes-de-paloumey-2017-second-vin-du-chateau-paloumey.png";

import NftItemBox from "./nft-item-box";

const NftItemArea = async () => {
    async function fetchAllFiles(endpoint: string, numberOfFiles: number): Promise<NftMetadata[]> {
        "use server";
        const fileIds = Array.from({ length: numberOfFiles }, (_, i) => i + 1);
        const promises = fileIds.map(async (fileId) => {
            const response = await fetch(`${endpoint}/${fileId}`);
            if (!response.ok) {
                throw new Error(`Error fetching file ${fileId}: ${response.statusText}`);
            }
            return response.json() as Promise<NftMetadata>;
        });

        const responses = await Promise.all(promises);
        return responses;
    }

    const numberIdwithPicture = mapperIdPhoto.size;
    const nftMetadata = await fetchAllFiles(ipfsGateway, numberIdwithPicture);
    nftMetadata.forEach((nft) => {
        nft.img = mapperIdPhoto.get(nft.properties.id) ?? aile;
    });

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {nftMetadata.slice(0, 3).map((item) => (
                        <div key={item.properties.id}>
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
