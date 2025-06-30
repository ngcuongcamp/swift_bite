import { z } from "zod";
// import mongoose from "mongoose";

// Schema validate cho updateShop
const updateShopSchema = z.object({
    // owner: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    //     message: "Invalid MongoDB ObjectId for owner",
    // }),
    name: z.string().min(1, "Shop name is required").optional(), // Làm optional
    description: z.string().optional(), // Sửa lỗi chính tả từ iption
    logo: z.string().url().optional(),
    banners: z.array(z.string().url()).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    socials: z
        .object({
            facebook: z.string().url().optional(),
            instagram: z.string().url().optional(),
            tiktok: z.string().url().optional(),
        })
        .optional(),
    openingHours: z
        .object({
            open: z.string().optional(),
            close: z.string().optional(),
        })
        .optional(),
    isActive: z.boolean().optional(),
}).strict();

export default updateShopSchema;