import mongoose from 'mongoose';

const Table = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  headers: { type: Array, required: true },
  columnTypes: { type: Array, required: true },
  rows: { type: Array, required: true },
});

export default mongoose.model('Table', Table);
