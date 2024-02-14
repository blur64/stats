import mongoose from 'mongoose';

const Session = new mongoose.Schema({
  userName: { type: String, required: true },
  expires: { type: Date, require: true },
});

export default mongoose.model('Session', Session);