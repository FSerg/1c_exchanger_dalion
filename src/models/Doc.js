import mongoose from 'mongoose';

const { Schema } = mongoose;
const docSchema = new Schema(
  {
    id_doc: { type: String, index: true },
    moment: Date,
    createdAt: { type: Date, index: true },
    date: { type: Date, index: true }
  },
  { strict: false }
);

mongoose.model('docs', docSchema);
