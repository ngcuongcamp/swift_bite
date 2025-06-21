import express from 'express'

import { updateProductInfo, updateProductStock, toggleProductVisibility } from '../controllers/Product/UpdateController.js'
import createProduct from '../controllers/Product/CreateController.js'
import deleteProduct from '../controllers/Product/DeleteController.js'
import { getPublicProducts, getAllProducts } from '../controllers/Product/GetController.js'


const router = express.Router()

// Thêm sản phẩm mới 
router.post('/', createProduct)

// Xóa sản phẩm
router.delete('/:id', deleteProduct)

// Cập nhật thông tin sản phẩms
router.put('/info/:id', updateProductInfo)
router.put('/stock/:id', updateProductStock)
router.patch('/visibility/:id', toggleProductVisibility)

// Lấy danh sách sản phẩm 
router.get('/', getPublicProducts)
router.get('/all', getAllProducts)



export default router
