import mongoose from "mongoose";

const Schema = mongoose.Schema;

// User Schema
const Userinfo = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("User", Userinfo);

// Content Schema
const ContentInfo = new Schema({
  id: { type: Number, required: true },
  type: {
    type: String,
    enum: ["document", "tweet", "youtube", "link"], // Restrict values to these options
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value),
      message: "Invalid URL format",
    },
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // tags: {
  //   type: [String],
  //   default: [],
  // },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Match model name for `ref`
});

export const ContentModel = mongoose.model("Content", ContentInfo);

// Links Schema
const LinkInfo = new Schema(
  {
    hash: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Match model name for `ref`
  },
  { collection: "links" } // Use lowercase singular name for consistency
);

export const LinkModel = mongoose.model("Link", LinkInfo);
