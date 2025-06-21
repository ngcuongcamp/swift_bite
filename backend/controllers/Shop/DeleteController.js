import Shop from "../../models/Shop.js";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { successResponse, errorResponse } from "../../utils/responseUltil.js";

// ✅ Delete Shop
export const deleteShop = async (req, res) => {
    try {
        // Lấy shopId từ params
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

        // Xóa shop bằng shopId
        await Shop.findByIdAndDelete(shopId);

        return successResponse(res, {
            statusCode: 200,
            shortMessage: "Deleted",
            message: [{ path: "", message: "Shop deleted successfully" }],
            data: null,
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