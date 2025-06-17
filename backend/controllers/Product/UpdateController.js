import Product from '../../models/Product.js';
import { ZodError } from 'zod';
import { errorResponse, successResponse } from '../../utils/responseUltil.js';
import { updateProductInfoSchema, updateProductStockSchema } from '../../validators/updateProduct.schema.js';
import { generateSlug } from '../../utils/slug_generate.js';
import mongoose from 'mongoose';


// #!TODO: UPDATE PRODUCT INFO
//  Update general info(name, desc, thumb, etc)
//  PUT /product/info/:id

export const updateProductInfo = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            statusCode: 400,
            shortMessage: 'Invalid ID',
            message: [{ path: 'id', message: 'Invalid product ID' }],
            data: null,
        });
    }

    try {
        const data = updateProductInfoSchema.parse(req.body);
        if (data.name) {
            data.slug = generateSlug(data.name);
        }

        const updated = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!updated) {
            return errorResponse(res, {
                statusCode: 404,
                shortMessage: 'Not Found',
                message: [{ path: 'id', message: 'Product not found' }],
                data: null,
            });
        }

        return successResponse(res, {
            statusCode: 200,
            shortMessage: 'Updated',
            message: [{ path: '', message: 'Product info updated successfully' }],
            data: updated,
        });
    } catch (err) {
        if (err instanceof ZodError) {
            const formatted = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
            return errorResponse(res, {
                statusCode: 400,
                shortMessage: 'Validation Failed',
                message: formatted,
                data: null,
            });
        }
        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Error',
            message: [{ path: '', message: err.message }],
            data: null,
        });
    }
};


// #!TODO: UPDATE PRODUCT STOCK
//  Update price, discount, stock, variations
//  PUT /product/stock/:id

export const updateProductStock = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            statusCode: 400,
            shortMessage: 'Invalid ID',
            message: [{ path: 'id', message: 'Invalid product ID' }],
            data: null,
        });
    }

    try {
        const data = updateProductStockSchema.parse(req.body);
        const updated = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!updated) {
            return errorResponse(res, {
                statusCode: 404,
                shortMessage: 'Not Found',
                message: [{ path: 'id', message: 'Product not found' }],
                data: null,
            });
        }

        return successResponse(res, {
            statusCode: 200,
            shortMessage: 'Updated',
            message: [{ path: '', message: 'Product stock updated successfully' }],
            data: updated,
        });
    } catch (err) {
        if (err instanceof ZodError) {
            const formatted = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
            return errorResponse(res, {
                statusCode: 400,
                shortMessage: 'Validation Failed',
                message: formatted,
                data: null,
            });
        }
        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Error',
            message: [{ path: '', message: err.message }],
            data: null,
        });
    }
};




// #!TODO: UPDATE PRODUCT  visibility
//  Toggle visibility
//  PATCH /product/visibility/:id


export const toggleProductVisibility = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            statusCode: 400,
            shortMessage: 'Invalid ID',
            message: [{ path: 'id', message: 'Invalid product ID' }],
            data: null,
        });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return errorResponse(res, {
                statusCode: 404,
                shortMessage: 'Not Found',
                message: [{ path: 'id', message: 'Product not found' }],
                data: null,
            });
        }

        product.isVisible = !product.isVisible;
        await product.save();

        return successResponse(res, {
            statusCode: 200,
            shortMessage: 'Visibility Toggled',
            message: [{ path: '', message: `Product is now ${product.isVisible ? 'visible' : 'hidden'}` }],
            data: product,
        });
    } catch (err) {
        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Error',
            message: [{ path: '', message: err.message }],
            data: null,
        });
    }
};