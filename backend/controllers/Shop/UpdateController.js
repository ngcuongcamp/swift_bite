import Shop from "../../models/Shop.js";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { successResponse, errorResponse } from "../../utils/responseUltil.js";
import { generateSlug } from "../../utils/slugGenerate.js";
import updateShopSchema from "../../validators/updateShop.schema.js";


export const updateShop = async (req, res) => {
    try {
        // validate du lieu tu body 
        const data = updateShopSchema.parse(req.body)
        const { owner, name } = data;

        // get shop id from params 
        const { shopId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return errorResponse(res, {
                statusCode: 400,
                shortMessage: "Validation Failed",
                message: [{ path: "shopId", message: "Invalid MongoDB ObjectId for shop" }],
                data: null,
            });
        }

        // Tìm shop
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return errorResponse(res, {
                statusCode: 404,
                shortMessage: "Not Found",
                message: [{ path: "shopId", message: "Shop not found" }],
                data: null,
            });
        }


        // Kiểm tra quyền owner
        if (shop.owner.toString() !== owner) {
            return errorResponse(res, {
                statusCode: 403,
                shortMessage: "Forbidden",
                message: [{ path: "", message: "You are not authorized to update this shop" }],
                data: null,
            });
        }

    }
    catch (err) {

    }
}