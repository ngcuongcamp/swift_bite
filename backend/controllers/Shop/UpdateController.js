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
        const { name, ...updateData } = data;

        console.log(name)

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
        // if (shop.owner.toString() !== owner) {
        //     return errorResponse(res, {
        //         statusCode: 403,
        //         shortMessage: "Forbidden",
        //         message: [{ path: "", message: "You are not authorized to update this shop" }],
        //         data: null,
        //     });
        // }


        // replace name with slug 
        if (name) {
            updateData.slug = generateSlug(name);
        }

        // update shop info 
        const updateShop = await Shop.findByIdAndUpdate(shopId, {
            $set: updateData,
        }, { new: true, runValidators: true })


        return successResponse(res, {
            statusCode: 200,
            shortMessage: "Updated",
            message: [{ path: "", message: "Shop updated successfully" }],
            data: null
        })

    }
    catch (err) {
        if (err instanceof ZodError) {
            const formatted = err.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            }));
            return errorResponse(res, {
                statusCode: 400,
                shortMessage: "Validation Failed",
                message: formatted,
                data: null,
            });
        }

        if (err.code === 11000) {
            return errorResponse(res, {
                statusCode: 409,
                shortMessage: "Duplicate",
                message: [{ path: "slug", message: "Shop slug already exists. Try a different name." }],
                data: err.keyValue,
            });
        }

        return errorResponse(res, {
            statusCode: 500,
            shortMessage: "Error",
            message: [{ path: "", message: err.message }],
            data: null,
        });
    }
}