import Shop from "../../models/Shop.js";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { successResponse, errorResponse } from "../../utils/responseUltil.js";
import z from "zod";


// // Schema validate cho getShops
// const getShopsSchema = z.object({
//     owner: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
//         message: "Invalid MongoDB ObjectId for owner",
//     }),
// }).strict();


export const getAllShops = async (req, res) => {
    try {
        // // Validate owner từ body
        // const { owner } = getShopsSchema.parse(req.body);

        // // Tìm danh sách shop của owner
        const shops = await Shop.find();

        return successResponse(res, {
            statusCode: 200,
            shortMessage: "Success",
            message: [{ path: "", message: "Shops retrieved successfully" }],
            data: shops,
        });
    } catch (err) {
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

        return errorResponse(res, {
            statusCode: 500,
            shortMessage: "Error",
            message: [{ path: "", message: err.message }],
            data: null,
        });
    }
}

export const getShopById = async (req, res) => {
    try {
        // // Validate owner từ body
        // const { owner } = getShopSchema.parse(req.body);

        // // Lấy shopId từ params
        // const { shopId } = req.params;
        // if (!mongoose.Types.ObjectId.isValid(shopId)) {
        //     return errorResponse(res, {
        //         statusCode: 400,
        //         shortMessage: "Validation Failed",
        //         message: [{ path: "shopId", message: "Invalid MongoDB ObjectId for shop" }],
        //         data: null,
        //     });
        // }

        // Tim shop theo shopId 


        const { shopId } = req.params;
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return errorResponse(res, {
                statusCode: 404,
                shortMessage: "Not Found",
                message: [{ path: "shopId", message: "Shop not found" }],
                data: null,
            });
        }


        // // Kiểm tra quyền owner
        // if (shop.owner.toString() !== owner) {
        //     return errorResponse(res, {
        //         statusCode: 403,
        //         shortMessage: "Forbidden",
        //         message: [{ path: "", message: "You are not authorized to view this shop" }],
        //         data: null,
        //     });
        // }


        return successResponse(res, {
            statusCode: 200,
            shortMessage: "Success",
            message: [{ path: "", message: "Shop retrieved successfully" }],
            data: shop,
        });
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

        return errorResponse(res, {
            statusCode: 500,
            shortMessage: "Error",
            message: [{ path: "", message: err.message }],
            data: null,
        });
    }
}