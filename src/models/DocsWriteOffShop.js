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
      product: String,
      product_code: String,
      vital: Boolean,
      ean: [
        {
          _id: false,
          barcode: String
        }
      ],
      count: Number,
      price: Number,
      summa: Number,
      summa_retail: Number
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DocsWriteOffShop", docSchema);
