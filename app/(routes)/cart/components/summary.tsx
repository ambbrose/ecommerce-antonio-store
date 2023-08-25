"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/use-cart";
import { Loader } from "lucide-react";


const Summary = () => {

    const { toast } = useToast();
    const searcParams = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);

    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    const totlPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0);

    useEffect(() => {
        if (searcParams.get("success")) {
            toast({
                variant: 'default',
                title: 'Checkout Completed',
                description: 'Checkout successfully completed.',
                className: 'bg-green-600 text-white'
            });
            removeAll();
        };

        if (searcParams.get('canceled')) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with the checkout process."
            });
        };

    }, [searcParams, removeAll, toast]);

    const onCheckout = async () => {
        setLoading(true);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id)
        });

        if (response.status === 200) {
            setLoading(false);

            window.location = response.data.url
        }

        setLoading(false);
    };

    return (
        <div className=" mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Order Summary
            </h2>

            <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order total
                    </div>

                    <Currency value={totlPrice} />
                </div>
            </div>

            <Button
                className="w-full mt-6 flex flex-row items-center justify-center"
                onClick={onCheckout}
                disabled={loading || items.length === 0}
            >
                {loading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                Checkout
            </Button>
        </div>
    );
};

export default Summary;