import Shop from "../../models/Shop.js";
import { shopSchema } from "../../validators/shop.schema.js";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { successResponse, errorResponse } from "../../utils/responseUltil.js";
import { generateSlug } from "../../utils/slugGenerate.js";

// ✅ Create shop

export const createShop = async (req, res) => {
    try {
        const data = shopSchema.parse(req.body)
        const shop = await Shop.create({ ...data, slug: generateSlug(req.body.name) })
        return successResponse(res, {
            statusCode: 201,
            shortMessage: 'Created',
            message: [{ path: '', message: 'Shop created successfully' }],
            data: null,
        });
    }
    catch (err) {
        // import Shop Model 
        if (err instanceof ZodError) {
            const formatted = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
            return errorResponse(res, {
                statusCode: 400,
                shortMessage: 'Validation Failed',
                message: formatted,
                data: null,
            });
        }

        if (err.code === 11000) {
            return errorResponse(res, {
                statusCode: 409,
                shortMessage: 'Duplicate',
                message: [{ path: '', message: 'Shop name or slug already exists' }],
                data: err.keyValue,
            });
        }

        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Error',
            message: [{ path: '', message: err.message }],
            data: null,
        });
    }
}