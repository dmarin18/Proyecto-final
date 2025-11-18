import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No permite dos usuarios con el mismo email
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Añade 'createdAt' y 'updatedAt' automáticamente
  }
);

export default mongoose.model("User", UserSchema);
