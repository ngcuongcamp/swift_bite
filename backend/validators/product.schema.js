import { z } from 'zod';
import mongoose from 'mongoose';

// ✅ ObjectId validator
const objectId = z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid MongoDB ObjectId',
    });

// ✅ Schema cho variations (kiểu như size, color)
const variationSchema = z.object({
    name: z.string().min(1, 'Variation name is required'),
    options: z.array(z.string().min(1)).nonempty('Options cannot be empty'),
});

// ✅ Schema cho từng stock item theo variation
const stockByVariationSchema = z.object({
    sku: z.string().min(1, 'SKU is required'),
    price: z.number().min(0, 'Price must be non-negative'),
    stock: z.number().min(0, 'Stock must be non-negative'),
    variation: z.object({
        size: z.string().min(1).optional(),
        color: z.string().min(1).optional(),
    }),
});

// ✅ Schema chính cho Product
export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    thumbnail: z.string().url('Thumbnail must be a valid URL'),
    images: z.array(z.string().url('Each image must be a valid URL')).nonempty('At least one image is required'),
    price: z.number().min(0, 'Price must be non-negative'),
    discount: z.number().min(0).max(100).default(0),
    stock: z.number().min(0, 'Stock must be non-negative').default(0),
    category: objectId,
    shop: objectId,
    sold: z.number().min(0).default(0),
    ratingAvg: z.number().min(0).max(5).default(0),
    variations: z.array(variationSchema).optional(),
    stockByVariation: z.array(stockByVariationSchema).optional(),
    isVisible: z.boolean().default(true),
});
