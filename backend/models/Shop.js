// 📦 models/Shop.js
const ShopSchema = new mongoose.Schema({
    name: String,
    description: String,
    logo: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.model("Shop", ShopSchema);