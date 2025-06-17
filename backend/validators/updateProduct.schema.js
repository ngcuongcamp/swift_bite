import { z } from 'zod';

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



// schema update info
export const updateProductInfoSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    thumbnail: z.string().url().optional(),
    images: z.array(z.string().url()).optional(),
    category: objectId.optional(),
    shop: objectId.optional(),
});


// schema update stock 
export const updateProductStockSchema = z.object({
    price: z.number().min(0).optional(),
    discount: z.number().min(0).max(100).optional(),
    stock: z.number().min(0).optional(),
    variations: z.array(variationSchema).optional(),
    stockByVariation: z.array(stockByVariationSchema).optional(),
});
