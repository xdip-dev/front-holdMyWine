import React from "react";
import Image from "next/image";
import { nftMetadata } from "@/data/nft/data";

export default function DetailNFT({ params }: { params: { id: string } }) {
    const data = nftMetadata.find((item) => item.id.toString() === params.id);
    if (!data) return <div>Not found</div>;
    return (
        <div className="container  my-2 p-4 m-auto border-2 rounded-lg shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className=" block  items-center col-span-1">
                    <Image src={data.img} alt="Product" width={450} height={450} />
                </div>
                <div className="col-span-2 px-2 flex flex-col">
                    <h3 className="text-lg font-semibold">{data.name}</h3>
                    <span className="text-sm text-gray-600">Grappe : {data.grappe}</span>
                    <span className="text-sm text-gray-600">Annee : {data.year}</span>
                    <div className="flex-grow">
                        {data.saveur.map((saveur) => (
                            <div className="inline border-2 rounded-full bg-stone-600 mx-1 font-medium text-white">
                                <span className="px-2 py-1">{saveur}</span>
                            </div>
                        ))}
                    </div>
                    <button className="bg-slate-800 px-3 py-4 my-2 rounded-3xl text-white ">BUY</button>
                </div>
            </div>
        </div>
    );
}
