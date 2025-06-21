import Product from "../../models/Product.js"
import { errorResponse, successResponse } from "../../utils/responseUltil.js";


// GET PUBLIC PRODUCT
// ✅ GET /api/products — public: chỉ lấy isVisible=true
export const getPublicProducts = async (req, res) => {
    return getProducts(req, res, { isVisible: true });
};
// ✅ GET /api/products/all — admin/shop: lấy tất cả, kể cả isVisible=false
export const getAllProducts = async (req, res) => {
    return getProducts(req, res);
};


const getProducts = async (req, res, extraFilter = {}) => {
    try {
        const {
            page = 1,
            limit = 10,
            keyword,
            category,
            shop,
            sort,
            'price[min]': priceMin,
            'price[max]': priceMax,
        } = req.query

        const filter = { ...extraFilter }

        if (keyword) {
            filter.name = { $regex: keyword, $options: 'i' }
        }
        if (category) {
            filter.category = category
        }
        if (shop) {
            filter.shop = shop
        }

        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }

        const sortOptions = {
            newest: { createdAt: -1 },
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            rating: { ratingAvg: -1 },
        }
        const sortBy = sortOptions[sort] || { createdAt: -1 };
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const products = await Product.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('category shop');

        const total = await Product.countDocuments(filter);
        const totalPages = Math.ceil(total / parseInt(limit));

        return successResponse(res, {
            statusCode: 200,
            shortMessage: 'Fetched',
            message: [{ path: '', message: 'Products fetched successfully' }],
            data: {
                products,
                total,
                totalPages,
                currentPage: parseInt(page),
            },
        });

    }
    catch (err) {
        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Error',
            message: [{ path: '', message: err.message }],
            data: null,
        });
    }
}