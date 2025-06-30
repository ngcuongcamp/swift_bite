import express from 'express'
import { createShop } from '../controllers/Shop/CreateController.js'
import { deleteShop } from '../controllers/Shop/DeleteController.js'
import { updateShop } from '../controllers/Shop/UpdateController.js'
import { getAllShops, getShopById } from '../controllers/Shop/GetController.js'


const router = express.Router()


// @route POST /api/v1/shops
// @desc Create a new shop 
router.post('/', createShop)


// @route DELETE /api/v1/shops/:shopId
// @desc Delete shop 
router.delete('/:shopId', deleteShop)


// @route PATCH /api/v1/shops/:shopId
// @desc update shop 
router.patch('/:shopId', updateShop)



// @route GET /api/v1/shops/:shopId
// @desc get shop 
router.get('/:shopId', getShopById)

// @route GET /api/v1/shops
// @desc get all shops 
router.get('', getAllShops)

export default router