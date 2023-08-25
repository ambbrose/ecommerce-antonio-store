"use client";

import { Product } from "@/types";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { MouseEventHandler } from 'react';
import { Expand, ShoppingCart } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import { useToast } from "@/components/ui/use-toast";
import Currency from "./currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
    data: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {

    const router = useRouter();
    const previewModal = usePreviewModal();

    const cart = useCart();
    const { toast } = useToast();

    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        previewModal.onOpen(data);
    };

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        const existingItem = cart.items.find((item) => item.id === data.id);

        if (!existingItem) {
            cart.addItem(data);

            toast({
                variant: 'default',
                title: 'Product Added',
                description: 'Product successfully added to cart.',
                className: 'bg-green-600 text-white'
            });
        } else if(existingItem) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "Product already in cart. Cannot add same product more than once."
            });
        };
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border rounded-xl group cursor-pointer p-3 space-y-4"
        >
            {/* images and actions */}
            <div className="aspect-square bg-gray-100 rounded-xl relative">
                <Image
                    src={data.images?.[0]?.url}
                    alt="Image"
                    fill
                    className="object-cover aspect-square rounded-md"
                />

                <div className="opacity-0 group-hover:opacity-100 absolute transition w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            classname=""
                            icon={<Expand size={20} className="text-gray-600" />}
                        />

                        <IconButton
                            onClick={onAddToCart}
                            classname=""
                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>

            {/* description */}
            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>

                <p className="text-sm text-gray-500">
                    {data.category.name}
                </p>
            </div>

            {/* price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    );
};

export default ProductCard;