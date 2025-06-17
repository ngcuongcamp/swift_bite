import express from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, getCategoryBySlug, updateCategory, updateCategoryOrder, toggleCategoryVisibility } from '../controllers/Category/CategoryController.js';


const router = express.Router()

// @route   GET /api/v1/categories
// @desc    Get all categories
router.get('/', getAllCategories);

// @route   POST /api/v1/categories
// @desc    Create a new category
router.post('/', createCategory);

// @route   GET /api/v1/categories/:id
// @desc    Get category by ID
router.get('/:id', getCategoryById);

// @route   GET /api/v1/categories/slug/:slug
// @desc    Get category by slug
router.get('/slug/:slug', getCategoryBySlug);

// @route   PUT /api/v1/categories/:id
// @desc    Update category by ID
router.put('/:id', updateCategory);


// @route   PUT /api/v1/categories/order/:id
// @desc    Update order (swap order index)
router.put('/order/:id', updateCategoryOrder);

// @route   DELETE /api/v1/categories/:id
// @desc    Delete category by ID
router.delete('/:id', deleteCategory);


// @route   PATCH /api/v1/categories/toggleVisible/:id
// @desc    PATCH toogle visible
router.patch('/toggleVisible/:id', toggleCategoryVisibility)

export default router;
