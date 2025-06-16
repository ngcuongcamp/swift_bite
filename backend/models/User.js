// 📦 models/User.js
import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: String,
    avatar: String,
    addresses: [{
        fullName: String,
        phone: String,
        address: String,
        isDefault: { type: Boolean, default: false }
    }],
    role: { type: String, enum: ["user", "supplier", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    otpCode: String,
    otpExpiresAt: Date
}, { timestamps: true });
export default model("User", UserSchema);