import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    firstName: String,
    lastName: String
};

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
