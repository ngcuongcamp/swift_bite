import Product from "../../models/Product.js";
import { productSchema } from "../../validators/product.schema.js";

import { ZodError } from "zod";
import { errorResponse, successResponse } from "../../utils/responseUltil.js";
import { generateSlug } from "../../utils/slugGenerate.js";

const createProduct = async (req, res) => {
    try {
        const data = productSchema.parse(req.body)
        data.slug = generateSlug(data.name)

        const product = await Product.create(data)

        return successResponse(res, {
            statusCode: 201,
            shortMessage: 'Created',
            message: [{ path: '', message: 'Product created successfully' }],
            data: null,
        });
    }

    catch (err) {
        if (err instanceof ZodError) {
            const formatted = err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message,
            }));
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
                message: [{ path: '', message: 'Duplicate field value' }],
                data: err.keyValue,
            });
        }


        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Internal Server Error',
            message: [{ path: '', message: err.message }],
            data: null,
        });
    }
}

export default createProduct