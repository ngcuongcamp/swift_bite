// 📦 models/Wishlist.js
const WishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});
export default mongoose.model("Wishlist", WishlistSchema);