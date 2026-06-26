const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
   title: { type: String, required: true },
   description: String,
   image: { url: String },
   originalPrice: Number,
   sellingPrice: Number,
   contactNumber: String,
   owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
   ownerName: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
