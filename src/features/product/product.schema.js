import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: { type: Number, min: 0 },
  //imageUrl: String,
  category: String,
  inStock: Number,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
});
