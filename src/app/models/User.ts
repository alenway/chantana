// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for your document
export interface IUser extends Document {
    name: string;
    email: string;
    createdAt: Date;
}

// Define the schema
const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
export default mongoose.models.User ||
    mongoose.model<IUser>("User", UserSchema);
