import qs from "query-string";

import { Product } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
// const URL = 'http://localhost:3000/api/db8254d2-eb66-49ff-ab18-9ef7253c5bc7/products'

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}; 

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured
        }
    });
    
    const res = await axios.get(url);

    return res.data;
};

export default getProducts;