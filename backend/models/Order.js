// 📦 models/Order.js
const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
});
const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [OrderItemSchema],
    totalPrice: Number,
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String
    },
    paymentMethod: { type: String, enum: ["cod", "momo", "paypal"], default: "cod" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    transactionId: String,
    shippingMethod: String,
    shippingFee: Number,
    trackingNumber: String,
    shippingStatus: [{ status: String, updatedAt: Date }],
    status: { type: String, enum: ["pending", "shipping", "delivered", "cancelled"], default: "pending" }
}, { timestamps: true });
export default mongoose.model("Order", OrderSchema);