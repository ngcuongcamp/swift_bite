import { z } from "zod";
import mongoose from "mongoose";

// Custom ObjectId validator
const objectId = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId"
});

// Schema for socials
const socialLinksSchema = z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    tiktok: z.string().url().optional()
}).optional();

// Schema for opening hours
const openingHoursSchema = z.object({
    open: z.string().optional(),
    close: z.string().optional()
}).optional();

export const shopSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    logo: z.string().url(),
    banners: z.array(z.string().url()).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    socials: socialLinksSchema,
    openingHours: openingHoursSchema,
    rating: z.number().min(0).max(5).optional(),
    followers: z.number().min(0).optional(),
    totalSales: z.number().min(0).optional(),
    owner: objectId,
    isActive: z.boolean().optional()
});