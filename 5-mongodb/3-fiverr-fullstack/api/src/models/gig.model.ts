import { model, Schema } from "mongoose";

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    packageTitle: {
      type: String,
      required: true,
    },
    packageDescription: {
      type: String,
      required: true,
    },
    packagePrice: {
      type: Number,
      required: true,
    },
    packageFeatures: {
      type: [String],
      required: true,
    },
    packageDuration: {
      type: Number,
      required: true,
    },
    packageRevision: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Gig = model("Gig", gigSchema);

export default Gig;
