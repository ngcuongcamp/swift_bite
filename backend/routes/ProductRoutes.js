import express from 'express'
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js'



const router = express.Router()

// @route   GET /api/products
// @desc    Get all products with search, filter, pagination
router.get('/', getAllProducts)

// @route   POST /api/products
// @desc    Create a new product
router.post('/', createProduct)

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get('/:id', getProductById)

// @route   PUT /api/products/:id
// @desc    Update product by ID
router.put('/:id', updateProduct)

// @route   DELETE /api/products/:id
// @desc    Delete product by ID
router.delete('/:id', deleteProduct)

export default router
