import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100, required: true },
    stock: { type: Number, default: 0, min: 0, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    sold: { type: Number, default: 0, min: 0 },
    ratingAvg: { type: Number, default: 0, min: 0, max: 5 },
    variations: [{ name: String, options: [String] }],
    stockByVariation: [{
        sku: String,
        price: Number,
        stock: Number,
        variation: {
            size: String,
            color: String
        }
    }],
    isVisible: { type: Boolean, default: true },
}, {
    timestamps: true
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;