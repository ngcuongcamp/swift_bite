import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    description: z.string().min(1).default("No description"),
    icon: z.string().min(1, { message: "Icon is required" }),
    image: z.string().min(1, { message: "Image is required" }),
    isVisible: z.boolean().optional(),
    // order: z.number().int().nonnegative({ message: "Order must be a non-negative integer" })
});