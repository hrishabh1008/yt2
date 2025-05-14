import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling

// Define the schema for the user collection
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true, // userName is required
      unique: true, // userName must be unique
    },
    userEmail: {
      type: String,
      required: true, // userEmail is required
      unique: true, // userEmail must be unique
    },
    userPassword: {
      type: String,
      require: true, // userPassword is required (typo: should be 'required')
    },
    channelName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channelModel", //reference to channel Model
    },
    userAvatar: {
      type: String,
      default: "https://example.com/default-avatar.png",
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Create the model from the schema
const userModel = mongoose.model("users", userSchema);

export default userModel; // Export the model for use in other files
