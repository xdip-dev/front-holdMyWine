import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NftMetadata } from "@/data/nft/data";
import { Providers } from "@/app/providers";
import PriceNft from "../Contract/PriceNft";

const NftItemBox = ({ item }: { item: NftMetadata }) => {
    // TO REDO link to single page

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="relative overflow-hidden  ">
                    <Image src={item.img} alt="Product" width={450} height={450} />
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* <Link href={`/nft/${item.id}`}> */}
                        <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
                            View Product
                        </button>
                        {/* </Link> */}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
                <div className="mt-4">
                    <Providers>
                        <PriceNft id={item.properties.id} />
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default NftItemBox;
