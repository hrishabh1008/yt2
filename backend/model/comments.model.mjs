import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to User model (should match mongoose.model name)
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);
export default commentModel;
