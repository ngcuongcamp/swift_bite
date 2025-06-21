import Product from '../../models/Product.js';
import mongoose from 'mongoose';
import { errorResponse, successResponse } from '../../utils/responseUltil.js';

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            statusCode: 400,
            shortMessage: 'Invalid ID',
            message: [{ path: 'id', message: 'Invalid product ID' }],
            data: null,
        });
    }

    try {
        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return errorResponse(res, {
                statusCode: 404,
                shortMessage: 'Not Found',
                message: [{ path: 'id', message: 'Product not found' }],
                data: null,
            });
        }

        return successResponse(res, {
            statusCode: 200,
            shortMessage: 'Deleted',
            message: [{ path: '', message: 'Product deleted successfully' }],
            data: null,
        });
    } catch (err) {
        return errorResponse(res, {
            statusCode: 500,
            shortMessage: 'Internal Server Error',
            message: [{ path: '', message: err.message }],
            data: null,
        });
    }
};


export default deleteProduct