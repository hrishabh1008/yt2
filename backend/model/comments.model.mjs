import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel", // Reference to User model
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
