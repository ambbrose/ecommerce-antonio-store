"use client";

import { useState, useEffect } from 'react';

import Button from "@/components/ui/button";
import useCart from '@/hooks/use-cart';

import { ShoppingBag } from "lucide-react";

import { useRouter } from 'next/navigation';

const NavbarAction = () => {

    const router = useRouter();

    const [mounted, setMounted] = useState<boolean>(false);

    const cart = useCart();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    };

    return (
        <div className="ml-auto flex items-center">
            <Button
                onClick={() => router.push('/cart')}
                className="flex items-center rounded-full bg-black px-4 py-2 cursor-pointer"
            >
                <ShoppingBag
                    size={20}
                    color="white"
                />

                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    );
};

export default NavbarAction;