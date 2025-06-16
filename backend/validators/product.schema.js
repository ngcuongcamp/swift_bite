import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    images: z.array(z.string()).optional(),
    price: z.number().nonnegative(),
    discount: z.number().min(0).max(100).optional(),
    stock: z.number().nonnegative().optional(),
    category: z.string().min(1), // ObjectId as string
    shop: z.string().min(1),     // ObjectId as string
    variations: z.array(z.object({
        name: z.string(),
        options: z.array(z.string())
    })).optional(),
    stockByVariation: z.array(z.object({
        sku: z.string(),
        price: z.number(),
        stock: z.number(),
        variation: z.object({
            size: z.string(),
            color: z.string()
        })
    })).optional()
});
