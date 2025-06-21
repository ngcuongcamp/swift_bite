import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    description: { type: String, default: "No description about shop" },
    logo: { type: String, required: true },
    banners: { type: [String], default: [] },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    socials: {
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        tiktok: { type: String, default: "" }
    },
    openingHours: {
        open: { type: String, default: "" },
        close: { type: String, default: "" }
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    followers: { type: Number, default: 0, min: 0 },
    totalSales: { type: Number, default: 0, min: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: false },
}, {
    timestamps: true
});

ShopSchema.index({ name: "text", description: "text" });

const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
export default Shop;