import { StaticImageData } from "next/image";
import fs from "fs";
import path from "path";

import aile from "@/assets/img/nft/ailes-de-paloumey-2017-second-vin-du-chateau-paloumey.png";
import chateau from "@/assets/img/nft/chateau-campillot-2018-cru-bourgeois.png";
import mouton from "@/assets/img/nft/mouton-cadet-heritage-2020-baron-philippe-de-rothschild.png";

export interface NftMetadata {
    id: number;
    img: StaticImageData;
    description: string;
    name: string;
    src?: string;
    grappe: string;
    saveur: string[];
    year: number;
    width?: number;
    height?: number;
}

const mapperIdPhoto = new Map<number, StaticImageData>([
    [1, aile],
    [2, chateau],
    [3, mouton],
]);

function readNftMetadataFromFolder(folderPath: string): NftMetadata[] {
    const nftMetadata: NftMetadata[] = [];

    // Read the directory
    const files = fs.readdirSync(folderPath);

    // Process each file
    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const fileContents = fs.readFileSync(filePath, "utf-8");

        try {
            // Parse the JSON and add to the array
            const metadata = JSON.parse(fileContents) as NftMetadata;
            metadata.img = mapperIdPhoto.get(metadata.id) || aile;
            nftMetadata.push(metadata);
        } catch (error) {
            console.error(`Error parsing JSON from file ${file}:`, error);
        }
    });

    return nftMetadata;
}
// TODO to redo better
const folderPath = path.join(__dirname, "../../../src/data/nft/metadata");
export const nftMetadata = readNftMetadataFromFolder(folderPath);
