// 📦 models/Notification.js
const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    isRead: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Notification", NotificationSchema);
