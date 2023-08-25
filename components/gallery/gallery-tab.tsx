import Image from "next/image";

import { Image as imageType } from "@/types";
import { cn } from "@/libs/utils";

import { Tab } from '@headlessui/react';

interface GalleryTabProps {
    image: imageType;
};

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
    return (
        <Tab className="relative flex aspect-square items-center justify-center rounded-md cursor-pointer bg-white">
            {({ selected }) => (
                <div>
                    <span className="absolute h-full w-full aspect-square inset-0 rounded-md overflow-hidden">
                        <Image
                            fill
                            src={image.url}
                            alt="image"
                            className="object-cover object-center"
                        />
                    </span>

                    <span className={cn(
                        "absolute inset-0 rounded-md ring-2 ring-offset-2",
                        selected ? "ring-black" : "ring-transparent"
                    )} />
                </div>
            )}
        </Tab>
    );
};

export default GalleryTab;