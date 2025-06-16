import Product from '../models/Product.js'
import mongoose from 'mongoose'
import { successResponse, errorResponse } from '../utils/responseUltil.js'
import { productSchema } from '../validators/product.schema.js'
import { ZodError } from 'zod'


// TODO: 
// @desc    Create a new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
    try {
        const validatedData = productSchema.parse(req.body);

        const newProduct = new Product(validatedData);
        await newProduct.save();

        return successResponse(res, {
            message: { path: '', message: 'Product created successfully' },
            shortMessage: 'Created',
            statusCode: 201,
            data: newProduct
        })
    } catch (err) {

        if (err instanceof ZodError) {
            const formatted = err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }));

            return errorResponse(res, {
                statusCode: 400,
                message: formatted,
                shortMessage: "Validation Failed",
                data: null
            });
        }

        return errorResponse(res, {
            message: [{ path: '', message: err.message || "Internal Server Error" }],
            shortMessage: 'Internal Server Error',
            statusCode: 500,
            data: null
        });
    }
}

// TODO: 
// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
    const id = req.params.id;

    // ❌ Invalid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            statusCode: 400,
            message: [{ path: "id", message: "Invalid product ID format" }],
            shortMessage: "Invalid ID",
            data: null
        });
    }

    try {
        const product = await Product.findById(id)
            .populate("category")
            .populate("shop");

        // ❌ Product not found
        if (!product) {
            return errorResponse(res, {
                statusCode: 404,
                message: [{ path: "id", message: "Product not found" }],
                shortMessage: "Not Found",
                data: null
            });
        }

        // ✅ Success
        return successResponse(res, {
            statusCode: 200,
            message: [{ path: "", message: "Product fetched successfully" }],
            shortMessage: "OK",
            data: product
        });

    } catch (err) {
        console.error(err);

        return errorResponse(res, {
            statusCode: 500,
            message: [{ path: "", message: err.message || "Internal Server Error" }],
            shortMessage: "Internal Error",
            data: null
        });
    }
};



// TODO: 
// @desc    Get all products with search, filter, pagination
// @route   GET /api/products
export const getAllProducts = async (req, res) => {
    try {
        const {
            keyword,
            category,
            shop,
            minPrice,
            maxPrice,
            page = 1,
            limit = 20,
            sortBy = 'createdAt',
            order = 'desc',
        } = req.query

        let filter = {}

        if (keyword) filter.name = { $regex: keyword, $options: 'i' }
        if (category) filter.category = category
        if (shop) filter.shop = shop
        if (minPrice || maxPrice) {
            filter.price = {}
            if (minPrice) filter.price.$gte = Number(minPrice)
            if (maxPrice) filter.price.$lte = Number(maxPrice)
        }

        const skip = (Number(page) - 1) * Number(limit)
        const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 }

        const total = await Product.countDocuments(filter)
        const products = await Product.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .populate('category')
            .populate('shop')

        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            products,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// TODO: 
// @desc    Update product by ID
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        if (!updated) return res.status(404).json({ error: 'Product not found' })

        res.status(200).json({ message: 'Product updated', product: updated })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// TODO: 
// @desc    Delete product by ID
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)

        if (!deleted) return res.status(404).json({ error: 'Product not found' })

        res.status(200).json({ message: 'Product deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
