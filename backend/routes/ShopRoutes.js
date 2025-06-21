import express from 'express'
import { createShop } from '../controllers/Shop/CreateController.js'
import { deleteShop } from '../controllers/Shop/DeleteController.js'


const router = express.Router()


// @route POST /api/v1/shops
// @desc Create a new shop 
router.post('/', createShop)


// @route DELETE /api/v1/shops
// @desc Delete shop 
router.delete('/:shopId', deleteShop)

export default router