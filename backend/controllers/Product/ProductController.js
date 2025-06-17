import Product from '../../models/Product.js'
import mongoose from 'mongoose'
import { successResponse, errorResponse } from '../../utils/responseUltil.js'
import { productSchema } from '../../validators/product.schema.js'
import { generateSlug } from '../../utils/slug_generate.js'


// TODO: 
// @desc    Create a new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
    try {
        // ✅ Validate input bằng Zod
        const validatedData = productSchema.parse(req.body);

        // ✅ Nếu client không truyền slug thì tự generate từ name
        if (!validatedData.slug) {
            validatedData.slug = generateSlug(validatedData.name);
            console.log(validatedData.slug)
        }

        // ✅ Tạo sản phẩm
        const product = await Product.create(validatedData);

        return successResponse(res, {
            message: { path: '', message: 'Product created successfully' },
            shortMessage: 'Created',
            statusCode: 201,
            data: product,
        });
    } catch (err) {

        // ✅ Bắt lỗi Zod validation
        if (err.name === 'ZodError') {
            return errorResponse(res, {
                message: { path: '', message: 'Validation error' },
                shortMessage: 'Invalid Input',
                statusCode: 400,
                data: err.errors,
            });
        }

        // ✅ Bắt lỗi MongoDB (duplicate key, etc.)
        if (err.code === 11000) {
            return errorResponse(res, {
                message: { path: '', message: 'Duplicate field value' },
                shortMessage: 'Duplicate',
                statusCode: 409,
                data: err.keyValue,
            });
        }

        return errorResponse(res, {
            message: { path: '', message: 'Internal Server Error' },
            shortMessage: 'Error',
            statusCode: 500,
            data: null,
        });
    }
}

// TODO:
// ✅ XÓA SẢN PHẨM BẰNG ID
// @desc    Delete a  product
// @route   DELETE /api/products/:id

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            statusCode: 400,
            shortMessage: 'Invalid ID',
            message: [{ path: 'id', message: 'Invalid product ID format' }],
            data: null
        });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return errorResponse(res, {
                statusCode: 404,
                shortMessage: 'Not Found',
                message: [{ path: 'id', message: 'Product not found' }],
                data: null
            });
        }

        await product.deleteOne();

        return successResponse(res, {
            statusCode: 200,
            shortMessage: 'Deleted',
            message: [{ path: '', message: 'Product deleted successfully' }],
            data: product
        });
    }
    catch (err) {
        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Internal Server Error',
            message: [{ path: '', message: err.message || 'Something went wrong' }],
            data: null
        });
    }
}
