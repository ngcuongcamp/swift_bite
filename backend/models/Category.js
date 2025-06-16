import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        default: "No description"
    },
    icon: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        required: true,
        unique: true // bắt buộc duy nhất để xử lý order logic chính xác
    },
}, { timestamps: true });



const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)

export default Category