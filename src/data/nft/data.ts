import { StaticImageData } from "next/image";

import aile from "@/assets/img/nft/ailes-de-paloumey-2017-second-vin-du-chateau-paloumey.png";
import chateau from "@/assets/img/nft/chateau-campillot-2018-cru-bourgeois.png";
import mouton from "@/assets/img/nft/mouton-cadet-heritage-2020-baron-philippe-de-rothschild.png";

interface IpfsMetadata {
    name: string;
    description: string;
    image: string;
    properties: {
        id: number;
        year: number;
        grappe: string;
        rich_property?: {
            name: string;
            value: string;
            display_value?: string;
            class?: string;
            css?: {
                color?: string;
                "font-weight"?: string;
            };
        };
        saveur?: {
            name: string;
            value: string[];
            class?: string;
        };
    };
}

export interface NftMetadata extends IpfsMetadata {
    img: StaticImageData;
}

export const mapperIdPhoto = new Map<number, StaticImageData>([
    [1, aile],
    [2, chateau],
    [3, mouton],
]);

export const ipfsGateway =
    "https://fuchsia-worthwhile-cuckoo-965.mypinata.cloud/ipfs/QmTEKwi5dZKPjakxxPTzmtta6AANqqpX8bbJMrgrJY1SZg/";
