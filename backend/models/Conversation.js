// 📦 models/Conversation.js
const MessageSchema = new mongoose.Schema({
    sender: { type: String, enum: ["user", "shop"] },
    content: String,
    createdAt: { type: Date, default: Date.now }
});
const ConversationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    messages: [MessageSchema]
}, { timestamps: true });
export default mongoose.model("Conversation", ConversationSchema);