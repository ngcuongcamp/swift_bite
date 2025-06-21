import { errorResponse, successResponse } from "../../utils/responseUltil.js";
import { categorySchema } from "../../validators/category.schema.js";
import Category from "../../models/Category.js";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { generateSlug } from "../../utils/slugGenerate.js";

// TODO:
// @desc    Create a new Category
// @route   POST /api/categories

export const createCategory = async (req, res) => {

    try {
        const validatedData = categorySchema.parse(req.body)

        // find max order 
        const lastCategory = await Category.findOne().sort('-order').exec();
        const newOrder = lastCategory ? lastCategory.order + 1 : 1;

        const category = new Category({
            ...validatedData,
            order: newOrder,
            slug: generateSlug(validatedData.name)
        });

        await category.save()

        return successResponse(res, {
            message: { path: '', message: 'Category created successfully' },
            shortMessage: 'Created',
            statusCode: 201,
            data: category
        })
    }
    catch (err) {

        if (err instanceof ZodError) {
            const formatted = err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }));


            return errorResponse(res, {
                statusCode: 400,
                message: formatted,
                shortMessage: "Validation Failed",
                data: null
            });
        }

        return errorResponse(res, {
            message: [{ path: '', message: err.message || "Internal Server Error" }],
            shortMessage: 'Internal Server Error',
            statusCode: 500,
            data: null
        });
    }
}


// TODO:
// @desc    GET ALL Category
// @route   GET /api/categories

export const getAllCategories = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10


    if (isNaN(page) || page < 1) {
        return errorResponse(res, {
            statusCode: 400,
            shortMessage: 'Validation Error',
            message: [
                { path: 'page', message: 'Page must be a positive number (>= 1)' }
            ],
            data: null
        });
    }

    if (isNaN(limit) || limit < 1) {
        return errorResponse(res, {
            statusCode: 400,
            shortMessage: 'Validation Error',
            message: [
                { path: 'limit', message: 'Limit must be a positive number (>= 1)' }
            ],
            data: null
        });
    }

    const skip = (page - 1) * limit

    const filter = {};

    // 👇 Nếu có truyền isVisible (ví dụ: ?isVisible=true hoặc ?isVisible=false)
    if (req.query.isVisible !== undefined) {
        const isVisible = req.query.isVisible === 'true'; // chuỗi → boolean
        filter.isVisible = isVisible;
    }



    try {
        // 🧮 Pagination params
        const [categories, total] = await Promise.all([
            Category.find(filter).sort({ order: 1, createAt: -1 }) // sort uu tien order truoc sau do den createAt 
                .skip(skip).limit(limit),
            Category.countDocuments(filter)
        ])

        return successResponse(res, {
            message: 'Fetched categories successfully',
            shortMessage: 'Success',
            statusCode: 200,
            data: {
                categories,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });
    }
    catch (err) {
        if (err instanceof ZodError) {
            const formatted = err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }));


            return errorResponse(res, {
                statusCode: 400,
                message: formatted,
                shortMessage: "Validation Failed",
                data: null
            });
        }

        return errorResponse(res, {
            message: [{ path: '', message: err.message || "Internal Server Error" }],
            shortMessage: 'Internal Server Error',
            statusCode: 500,
            data: null
        });
    }
}



// TODO:
// @desc    GET  Category By Id
// @route   GET /api/categories/:id


export const getCategoryById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            message: "Invalid category ID format",
            shortMessage: "Invalid ID",
            statusCode: 400,
            data: null,
        });
    }

    try {
        const category = await Category.findById(id);

        if (!category) {
            return errorResponse(res, {
                message: "Category not found",
                shortMessage: "Not Found",
                statusCode: 404,
                data: null,
            });
        }

        return successResponse(res, {
            message: "Category fetched successfully",
            shortMessage: "Success",
            statusCode: 200,
            data: category,
        });
    } catch (err) {
        return errorResponse(res, {
            message: err.message || "Internal Server Error",
            shortMessage: "Internal Server Error",
            statusCode: 500,
            data: null,
        });
    }
};



// TODO:
// @desc    GET  Category By slug
// @route   GET /api/categories/slug/:slug

export const getCategoryBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await Category.findOne({ slug });

        if (!category) {
            return errorResponse(res, {
                message: "Category not found",
                shortMessage: "Not Found",
                statusCode: 404,
                data: null,
            });
        }

        return successResponse(res, {
            message: "Category fetched successfully",
            shortMessage: "Success",
            statusCode: 200,
            data: category,
        });
    } catch (err) {
        return errorResponse(res, {
            message: err.message || "Internal Server Error",
            shortMessage: "Internal Server Error",
            statusCode: 500,
            data: null,
        });
    }
};


// TODO:
// @desc    DELETE  Delete Category
// @route   DELETE /api/categories/:id

export const deleteCategory = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            message: "Invalid category ID format",
            shortMessage: "Invalid ID",
            statusCode: 400,
            data: null,
        });
    }

    try {
        const deleted = await Category.findByIdAndDelete(id);

        if (!deleted) {
            return errorResponse(res, {
                message: "Category not found",
                shortMessage: "Not Found",
                statusCode: 404,
                data: null,
            });
        }

        return successResponse(res, {
            message: "Category deleted successfully",
            shortMessage: "Deleted",
            statusCode: 200,
            data: deleted,
        });
    } catch (err) {
        return errorResponse(res, {
            message: err.message || "Internal Server Error",
            shortMessage: "Internal Server Error",
            statusCode: 500,
            data: null,
        });
    }
};




// TODO:
// @desc    PUT  Update Category
// @route   PUT /api/categories/:id


export const updateCategory = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            message: "Invalid category ID format",
            shortMessage: "Invalid ID",
            statusCode: 400,
            data: null,
        });
    }

    const { order, ...dataToUpdate } = req.body

    try {
        const updated = await Category.findByIdAndUpdate(id, dataToUpdate, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return errorResponse(res, {
                message: "Category not found",
                shortMessage: "Not Found",
                statusCode: 404,
                data: null,
            });
        }

        return successResponse(res, {
            message: "Category updated successfully",
            shortMessage: "Updated",
            statusCode: 200,
            data: updated,
        });
    } catch (err) {
        return errorResponse(res, {
            message: err.message || "Internal Server Error",
            shortMessage: "Internal Server Error",
            statusCode: 500,
            data: null,
        });
    }
};

// TODO:
// @desc    PUT  Update Order Category
// @route   PUT /api/categories/order/:id

export const updateCategoryOrder = async (req, res) => {
    const { id } = req.params;
    const { order: newOrder } = req.body;

    if (typeof newOrder !== 'number' || newOrder < 0) {
        return errorResponse(res, {
            statusCode: 400,
            message: 'Order must be a non-negative number',
            shortMessage: 'Invalid Order',
            data: null
        });
    }

    try {
        const target = await Category.findById(id);
        if (!target) {
            return errorResponse(res, {
                statusCode: 404,
                message: 'Category not found',
                shortMessage: 'Not Found',
                data: null
            });
        }

        if (target.order === newOrder) {
            return successResponse(res, {
                statusCode: 200,
                message: 'No change in order',
                shortMessage: 'No Change',
                data: target
            });
        }

        const originalOrder = target.order;

        // Tìm xem có category nào đang giữ order mới không
        const swap = await Category.findOne({ order: newOrder });

        if (swap) {
            // Tạm set target về order tạm để tránh duplicate
            target.order = -1;
            await target.save();

            // Swap order
            swap.order = originalOrder;
            await swap.save();

            target.order = newOrder;
            await target.save();
        } else {
            // Nếu không có category nào giữ newOrder thì chỉ cần gán thôi
            if (!swap) {
                return errorResponse(res, {
                    statusCode: 400,
                    message: `No category found with order ${newOrder} to swap with`,
                    shortMessage: 'Invalid Target Order',
                    data: null
                });
            }
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'Category order updated successfully',
            shortMessage: 'Order Updated',
            data: target
        });

    } catch (err) {
        console.error(err);
        return errorResponse(res, {
            statusCode: 500,
            message: err.message || 'Internal Server Error',
            shortMessage: 'Internal Server Error',
            data: null
        });
    }
};



// TODO:
// @desc    PATCH  Toggle isVisible
// @route   PATCH /api/categories/:id/isVisible
export const toggleCategoryVisibility = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, {
            message: "Invalid category ID",
            shortMessage: "Invalid ID",
            statusCode: 400,
            data: null,
        });
    }

    try {
        const category = await Category.findById(id);

        if (!category) {
            return errorResponse(res, {
                message: "Category not found",
                shortMessage: "Not Found",
                statusCode: 404,
                data: null,
            });
        }

        category.isVisible = !category.isVisible;
        await category.save();

        return successResponse(res, {
            message: `Category visibility set to ${category.isVisible}`,
            shortMessage: "Visibility Updated",
            statusCode: 200,
            data: category,
        });

    } catch (err) {
        return errorResponse(res, {
            message: err.message || "Internal Server Error",
            shortMessage: "Internal Server Error",
            statusCode: 500,
            data: null,
        });
    }
};