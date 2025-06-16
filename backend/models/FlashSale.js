// 📦 models/FlashSale.js
const FlashSaleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    discountPrice: Number,
    startAt: Date,
    endAt: Date,
    stock: Number
});
export default mongoose.model("FlashSale", FlashSaleSchema);