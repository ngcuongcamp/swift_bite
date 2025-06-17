import express from 'express'
import {
    createProduct,
    // getAllProducts,
    // getProductById,
    // updateProduct,
    deleteProduct
} from '../controllers/Product/ProductController.js'
import { updateProductInfo, updateProductStock, toggleProductVisibility } from '../controllers/Product/UpdateController.js'



const router = express.Router()

// Thêm sản phẩm mới 
router.post('/', createProduct)

// Xóa sản phẩm
router.delete('/:id', deleteProduct)

// Cập nhật thông tin sản phẩm
router.put('/info/:id', updateProductInfo)
router.put('/stock/:id', updateProductStock)
router.patch('/visibility/:id', toggleProductVisibility)



export default router
