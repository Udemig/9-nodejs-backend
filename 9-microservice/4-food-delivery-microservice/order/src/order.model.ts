import { Schema, model } from "mongoose";

const xSchema = new Schema(
  {
    X: {
      type: String,
      required: [true, "X zorunludur"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// model
export default model("X", xSchema);
