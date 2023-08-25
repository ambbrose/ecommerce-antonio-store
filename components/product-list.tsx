"use client";

import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";

interface ProductListPorps {
    title: string;
    items: Product[]
};

const ProductList: React.FC<ProductListPorps> = ({title, items}) => {
    return (
        <div className="space-y-4 ">
            <h3>{title}</h3>

            {items.length < 1 && <NoResult />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-2">
                {items.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;