const VoucherSchema = new mongoose.Schema({
    code: String,
    discountType: { type: String, enum: ["percent", "fixed"] },
    discountValue: Number,
    minOrderValue: Number,
    expiryDate: Date,
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});
export default mongoose.model("Voucher", VoucherSchema);