import mongoose from "mongoose";

const { Schema } = mongoose;
const docSchema = new Schema({
  id_doc: { type: String, index: true },
  date: { type: Date, index: true },
  number: String,
  deleting_mark: Boolean,
  recognized: Boolean,
  user: String,
  moment_of_changes: { type: Date, index: true },
  head: {
    organization_inn: String,
    shop: String,
    type_doc: String,
    summa_doc: Number,
    comment: String
  },
  positions: [
    {
      _id: false,
      product_minus: String,
      product_plus: String,
      product_minus_code: String,
      product_plus_code: String,
      vital_minus: Boolean,
      vital_plus: Boolean,
      ean_minus: [
        {
          _id: false,
          barcode: String
        }
      ],
      ean_plus: [
        {
          _id: false,
          barcode: String
        }
      ],
      quantity_minus: Number,
      quantity_plus: Number,
      price_minus: Number,
      price_plus: Number,
      summa_minus: Number,
      summa_plus: Number
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DocsResortingShop", docSchema);
