// 📦 models/ReturnRequest.js
const ReturnRequestSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    reason: String,
    status: { type: String, enum: ["pending", "approved", "rejected", "refunded"], default: "pending" },
    refundAmount: Number
}, { timestamps: true });
export default mongoose.model("ReturnRequest", ReturnRequestSchema);